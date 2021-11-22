import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Banner } from '../components/app';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import { Empty, EventsCard, Loader, Searchbar } from '../components/global';
import { getStartPage, isArrayEmpty } from '../utility';
import useOnError from '../services/use-on-error';
import { PAGE_SIZE_ALT } from '../utility/constants';
import Pagination from '../components/global/pagination';

const DEFAULT_QUERY = {
  _limit: PAGE_SIZE_ALT,
  _sort: 'created_at:DESC'
};
export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorData, setError] = useState();
  const [eventData, setEvents] = useState([]);
  const [eventDataCount, setEventsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useOnError(errorData);

  const fetchEvents = useCallback(async () => {
    const { data } = await axios.get('/events', { params: query });
    setEvents(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEventsCount = useCallback(async () => {
    const { data } = await axios.get('/events/count');
    setEventsCount(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchEvents(), fetchEventsCount()])
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

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const newQuery = {
        ...query,
        _start: getStartPage(page, PAGE_SIZE_ALT)
      };

      const { data } = await axios.get('/events', {
        params: newQuery
      });

      setEvents(data);
      setCurrentPage(page);
      setQuery(newQuery);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const searchQuery = { title_contains: searchValue };

      const newQuery = {
        ...query,
        ...searchQuery
      };

      const { data } = await axios.get('/events', { params: newQuery });
      setEvents(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/events/count', {
        params: searchQuery
      });
      setEventsCount(countData);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    const { data } = await axios.get('/events', {
      params: DEFAULT_QUERY
    });

    setEvents(data);
    setQuery(DEFAULT_QUERY);

    const { data: countData } = await axios.get('/events/count');
    setEventsCount(countData);
  };

  const onClear = async () => {
    setLoading(true);
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
    setLoading(false);
  };

  return (
    <section className="events">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      <Banner title="Events" />

      <div className="section pb-0">
        <div className="container">
          <Searchbar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={onClear}
            onSearch={handleSearch}
            placeholder="Search by title"
          />
        </div>
      </div>

      <div className="section">
        <div className="container">
          {isArrayEmpty(eventData) && (
            <div className="mt-8">
              <Empty className="color-primary" icon="icon-calendar" />
            </div>
          )}

          <div className="relative">
            {loading && <Loader inline />}

            {!isArrayEmpty(eventData) && (
              <div className="row">
                {eventData.map((item, i) => (
                  <div className="col-md-4 mb-5" key={i}>
                    <EventsCard item={item} />
                  </div>
                ))}
              </div>
            )}

            {eventDataCount > PAGE_SIZE_ALT && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={eventDataCount}
                  pageSize={PAGE_SIZE_ALT}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
