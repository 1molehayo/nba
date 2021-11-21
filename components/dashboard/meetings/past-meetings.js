import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import {
  DATE_FORMAT_VIEW,
  MEETING_HEADERS,
  PAGE_SIZE,
  PAGE_SIZE_SM
} from '../../../utility/constants';
import { Empty, Loader } from '../../global';
import useOnError from '../../../services/use-on-error';
import Pagination from '../../global/pagination';
import axios from '../../../services/axios';
import { getStartPage, isArrayEmpty } from '../../../utility';
import handleApiError from '../../../services/handle-api-error';
import { Table } from '..';

export default function PastMeetings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(0);
  const router = useRouter();

  const query = {
    date_lt: new Date().toISOString()
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
      fetchMeetings({ ...query, _limit: PAGE_SIZE, _sort: 'date:DESC' }),
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
    setLoading(true);
    try {
      const newQuery = {
        ...query,
        _limit: PAGE_SIZE,
        _sort: 'date:DESC',
        _start: getStartPage(page)
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
      setLoading(false);
    }
  };

  return (
    <div className="section pt-0">
      <h4 className="pb-5">Meeting History</h4>

      <div className="relative">
        {loading && <Loader inline />}

        {isArrayEmpty(meetings) && (
          <Empty
            className="mt-5 color-primary"
            icon="icon-meeting"
            desc="You have not attended any meetings"
          />
        )}
        {!isArrayEmpty(meetings) && (
          <Table headers={MEETING_HEADERS}>
            {meetings.map((imeeting, j) => (
              <tr key={j}>
                <td>{j + 1}</td>
                <td>{imeeting.title}</td>
                <td>{imeeting.description}</td>
                <td>{moment(imeeting.date).format(DATE_FORMAT_VIEW)}</td>
                <td>{imeeting.time}</td>
              </tr>
            ))}
          </Table>
        )}
        {count > PAGE_SIZE_SM && (
          <div className="section pb-0">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={count}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
