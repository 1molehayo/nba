import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import withAuth from '../../../services/with-auth';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { getStartPage, isArrayEmpty, notify } from '../../../utility';
import { Empty, Loader } from '../../../components/global';
import { useCurrentUser } from '../../../contexts/current-user';
import {
  DEFAULT_ROLE_TYPE,
  MEMBERS_HEADERS,
  PAGE_SIZE
} from '../../../utility/constants';
import { MemberRow, Table } from '../../../components/dashboard';
import styles from '../../../styles/dashboard/pages/members.module.scss';
import Pagination from '../../../components/global/pagination';
import useAuthGuard from '../../../services/use-auth-guard';

function Members({ members, membersCount, error }) {
  const { uid } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembers] = useState([]);
  const [toggling, setToggling] = useState(false);
  const [loading, setLoading] = useState(false);

  useAuthGuard('find.profiles');

  useOnError(error);

  useEffect(() => {
    if (members) {
      const membersArr = members.filter((item) => item.uid !== uid);
      setMembers(membersArr);
    }

    return () => {};
  }, [members, uid]);

  const onToggleActivate = async (member) => {
    setToggling(true);

    try {
      const data = {
        blocked: !member.blocked
      };

      await axios.put(`/users/${member.uid}`, data);

      const arr = membersData.map((item) => {
        if (item.uid === member.uid) {
          return { ...item, blocked: !item.blocked };
        }

        return item;
      });

      setMembers(arr);

      notify({
        type: 'success',
        message: `${member.first_name}'s profile is now ${
          !member.blocked ? 'suspended' : 'active'
        }`
      });
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setToggling(false);
    }
  };

  const onToggleAdmin = async (member) => {
    setToggling(true);

    try {
      const data = {
        role:
          member.role.type === 'administrator'
            ? DEFAULT_ROLE_TYPE
            : 'administrator'
      };

      const newData = await axios.put(`/users/${member.uid}`, data);

      const arr = membersData.map((item) => {
        if (item.uid === member.uid) {
          return { ...item, role: newData.role };
        }

        return item;
      });

      setMembers(arr);

      notify({
        type: 'success',
        message: `${member.first_name}'s profile has been ${
          member.role.type === 'administrator'
            ? 'upgraded to administrator account'
            : 'degraded to lawyer account'
        }`
      });
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setToggling(false);
    }
  };

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/profiles?_start=${getStartPage(page)}&_limit=${PAGE_SIZE}`
      );
      setMembers(data);
      setCurrentPage(page);
    } catch (err) {
      const errorObj = handleApiError(err);
      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      {toggling && <Loader />}

      <div className="section pt-0">
        <h4 className="pb-5">Members list</h4>

        {isArrayEmpty(membersData) && (
          <Empty
            className="mt-5 color-primary"
            icon="icon-profile"
            desc="No other users have signed up"
          />
        )}

        <div className="relative">
          {loading && <Loader inline />}

          {!isArrayEmpty(membersData) && (
            <Table headers={MEMBERS_HEADERS} className={styles.table}>
              {membersData.map((member, j) => (
                <MemberRow
                  key={j}
                  index={j + 1}
                  member={member}
                  onToggleActivate={onToggleActivate}
                  onToggleAdmin={onToggleAdmin}
                />
              ))}
            </Table>
          )}

          {!loading && membersCount > PAGE_SIZE && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={membersCount}
                pageSize={PAGE_SIZE}
                onPageChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Members.propTypes = {
  error: PropTypes.object,
  members: PropTypes.array,
  membersCount: PropTypes.number
};

export default withAuth(Members);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let members = null;
  let membersCount = null;
  let error = {};

  try {
    const { data } = await axios.get('/profiles?_start=1&_limit=10', config);
    members = data;
    const countResponse = await axios.get('/profiles/count', config);
    membersCount = countResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        members,
        membersCount,
        error
      }
    };
  }
}
