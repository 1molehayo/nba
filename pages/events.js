import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../components/app';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import { Empty, EventsCard, Loader, Searchbar } from '../components/global';
import { getStartPage, isArrayEmpty } from '../utility';
import useOnError from '../services/use-on-error';
import { PAGE_SIZE_ALT } from '../utility/constants';
import Pagination from '../components/global/pagination';

export default function Events({ events, eventsCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorData, setError] = useState(error);
  const [eventData, setEvents] = useState(events);
  const [eventDataCount, setEventsCount] = useState(eventsCount);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState({ _limit: PAGE_SIZE_ALT });

  useOnError(errorData);

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
      params: { _limit: PAGE_SIZE_ALT }
    });

    setEvents(data);
    setQuery({ _limit: PAGE_SIZE_ALT });

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

Events.propTypes = {
  error: PropTypes.object,
  events: PropTypes.object,
  eventsCount: PropTypes.number
};

export async function getServerSideProps() {
  let events = [];
  let eventsCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/events', {
      params: { _limit: PAGE_SIZE_ALT }
    });
    events = data;
    const { data: countData } = await axios.get('/events/count');
    eventsCount = countData;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        events,
        eventsCount,
        error
      } // will be passed to the page component as props
    };
  }
}
