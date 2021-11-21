import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PAGE_SIZE_SM } from '../../../utility/constants';
import { Empty, Loader } from '../../global';
import useOnError from '../../../services/use-on-error';
import Pagination from '../../global/pagination';
import axios from '../../../services/axios';
import {
  getPermissions,
  getStartPage,
  isArrayEmpty,
  notify
} from '../../../utility';
import { useCurrentUser } from '../../../contexts/current-user';
import { MeetingCard } from './meeting-card';
import handleApiError from '../../../services/handle-api-error';

export default function UpcomingMeetings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState();
  const { role } = useCurrentUser();
  const router = useRouter();

  const query = {
    date_gte: new Date().toISOString()
  };

  const fetchMeetings = useCallback(async (params) => {
    setLoading(true);
    try {
      const { data } = await axios.get('/meetings', { params });
      setMeetings(data || []);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCount = useCallback(async (params) => {
    const { data } = await axios.get('/meetings/count', { params });
    setCount(data || 0);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([
      fetchMeetings({ ...query, _limit: 6, _sort: 'date:DESC' }),
      fetchCount(query)
    ]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useOnError(error);

  const handlePageChange = async (page) => {
    setDeleting(true);
    try {
      const newQuery = {
        ...query,
        _limit: 6,
        _sort: 'date:DESC',
        _start: getStartPage(page, 6)
      };

      await fetchMeetings(newQuery);
      // eslint-disable-next-line no-underscore-dangle
      delete newQuery._limit;

      router.push({ pathname: router.pathname, query: newQuery }, 'as', {
        shallow: true
      });

      setCurrentPage(page);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/meetings/${id}`);
      await fetchData();

      notify({
        type: 'success',
        message: 'Meeting deleted successfully'
      });
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative">
      {(loading || deleting) && <Loader />}

      {isArrayEmpty(meetings) && (
        <Empty
          className="mt-5 color-primary"
          icon="icon-meeting"
          desc="No upcoming meetings available"
        />
      )}

      <div className="row">
        {meetings &&
          meetings.map((item, i) => (
            <div className="col-6" key={i}>
              <MeetingCard
                item={item}
                link={
                  getPermissions(role).includes('update.meetings')
                    ? `/dashboard/meetings/${item.slug}`
                    : null
                }
                onDelete={
                  getPermissions(role).includes('delete.meetings')
                    ? () => handleDelete(item.id)
                    : null
                }
              />
            </div>
          ))}
      </div>

      {count > PAGE_SIZE_SM && (
        <div className="section pb-0">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={count}
            pageSize={6}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </div>
  );
}
