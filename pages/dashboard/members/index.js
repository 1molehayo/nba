import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import withAuth from '../../../services/with-auth';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { isArrayEmpty, notify } from '../../../utility';
import { Empty, Loader } from '../../../components/global';
import { useCurrentUser } from '../../../contexts/current-user';
import { MEMBERS_HEADERS } from '../../../utility/constants';
import { MemberRow, Table } from '../../../components/dashboard';
import styles from '../../../styles/dashboard/pages/members.module.scss';

function Members({ members, error }) {
  const { uid } = useCurrentUser();
  const [membersData, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (members) {
      const membersArr = members.filter((item) => item.uid !== uid);
      setMembers(membersArr);
    }

    return () => {};
  }, [members, uid]);

  useOnError(error);

  const onToggleActivate = async (member) => {
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      {loading && <Loader />}

      <div className="section pt-0">
        <h4 className="pb-5">Members list</h4>

        {isArrayEmpty(membersData) && (
          <Empty
            className="mt-5 color-black"
            icon="icon-profile"
            desc="No other users have signed up"
          />
        )}

        {!isArrayEmpty(membersData) && (
          <Table headers={MEMBERS_HEADERS} className={styles.table}>
            {membersData.map((member, j) => (
              <MemberRow
                key={j}
                index={j + 1}
                member={member}
                onToggleActivate={onToggleActivate}
              />
            ))}
          </Table>
        )}
      </div>
    </section>
  );
}

Members.propTypes = {
  members: PropTypes.array,
  error: PropTypes.object
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
  let error = {};

  try {
    const { data } = await axios.get('/profiles', config);
    members = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        members,
        error
      }
    };
  }
}
