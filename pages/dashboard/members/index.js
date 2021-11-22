import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import withAuth from '../../../services/with-auth';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { getStartPage, isArrayEmpty, notify } from '../../../utility';
import { Empty, Loader, Searchbar } from '../../../components/global';
import {
  DEFAULT_ROLE_TYPE,
  MEMBERS_HEADERS,
  PAGE_SIZE
} from '../../../utility/constants';
import { MemberRow, Table } from '../../../components/dashboard';
import styles from '../../../styles/dashboard/pages/members.module.scss';
import Pagination from '../../../components/global/pagination';
import useAuthGuard from '../../../services/use-auth-guard';
import { useCurrentUser } from '../../../contexts/current-user';

function Members() {
  const [errorData, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembers] = useState([]);
  const [membersCountData, setMembersCount] = useState(0);
  const [toggling, setToggling] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { uid } = useCurrentUser();

  const DEFAULT_QUERY = {
    _limit: PAGE_SIZE,
    _sort: 'first_name:ASC',
    uid_ne: uid
  };
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useAuthGuard('find.profiles');

  useOnError(errorData);

  const fetchMembers = useCallback(async () => {
    const { data } = await axios.get('/profiles', { params: query });
    setMembers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMembersCount = useCallback(async () => {
    const { data } = await axios.get('/profiles/count', {
      params: { uid_ne: uid }
    });
    setMembersCount(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchMembers(), fetchMembersCount()])
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(handleApiError(err));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const newQuery = {
        ...query,
        _start: getStartPage(page)
      };

      const { data } = await axios.get('/profiles', {
        params: newQuery
      });

      setMembers(data);
      setCurrentPage(page);
      setQuery(newQuery);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const searchQuery = {
        '_where[_or][0][first_name_contains]': searchValue,
        '_where[_or][1][last_name_contains]': searchValue
      };

      const newQuery = {
        ...query,
        ...searchQuery
      };

      const { data } = await axios.get('/profiles', { params: newQuery });
      setMembers(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/profiles/count', {
        params: { ...searchQuery, uid_ne: uid }
      });
      setMembersCount(countData);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    const { data } = await axios.get('/profiles', {
      params: DEFAULT_QUERY
    });

    setMembers(data);
    setQuery(DEFAULT_QUERY);

    const { data: countData } = await axios.get('/profiles/count');
    setMembersCount(countData);
  };

  const onClear = async () => {
    setLoading(true);
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
    setLoading(false);
  };

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      <div className="section pt-0">
        <div className="d-flex justify-content-between pb-5">
          <h4 className="mb-0">Members list</h4>

          <Searchbar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={onClear}
            onSearch={handleSearch}
            placeholder="Search by name"
            className="searchbar--sm"
          />
        </div>

        {isArrayEmpty(membersData) && (
          <Empty
            className="mt-5 color-primary"
            icon="icon-profile"
            desc="No other users have signed up"
          />
        )}

        <div className="relative">
          {(loading || toggling) && <Loader inline />}

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

          {membersCountData > PAGE_SIZE && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={membersCountData}
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

export default withAuth(Members);
