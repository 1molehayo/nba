import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import {
  Empty,
  EventsCard,
  Loader,
  Searchbar
} from '../../../components/global';
import {
  getPermissions,
  getStartPage,
  isArrayEmpty,
  notify
} from '../../../utility';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';
import { PAGE_SIZE_ALT } from '../../../utility/constants';
import Pagination from '../../../components/global/pagination';
import useAuthGuard from '../../../services/use-auth-guard';

function Events({ events, eventsCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventData, setEvents] = useState(events);
  const [errorData, setError] = useState(error);
  const [eventDataCount, setEventsCount] = useState(eventsCount);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState({ _limit: PAGE_SIZE_ALT });
  const { role } = useCurrentUser();

  useAuthGuard('find.events');

  useOnError(errorData);

  const resetData = async () => {
    const { data } = await axios.get('/events', {
      params: { _limit: PAGE_SIZE_ALT }
    });

    setEvents(data);
    setQuery({ _limit: PAGE_SIZE_ALT });

    const { data: countData } = await axios.get('/events/count');
    setEventsCount(countData);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/events/${id}`);
      await resetData();

      notify({
        type: 'success',
        message: 'Event deleted successfully'
      });
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDeleting(false);
    }
  };

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

  const onClear = async () => {
    setLoading(true);
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
    setLoading(false);
  };

  return (
    <section className="section pt-0">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <div className="header-title-block">
            <h4>Events</h4>

            <div className="d-flex align-items-center">
              <Searchbar
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={onClear}
                onSearch={handleSearch}
                placeholder="Search by title"
                className="searchbar--sm"
              />

              {getPermissions(role).includes('create.events') && (
                <Link href="/dashboard/events/create" passHref>
                  <button className="button button--primary ml-3">
                    Create event
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="relative pt-5">
            {(loading || deleting) && <Loader inline />}

            {isArrayEmpty(eventData) && (
              <Empty
                className="mt-5 color-primary"
                icon="icon-calendar"
                desc="No events available"
              />
            )}

            <div className="row">
              {eventData.map((item, i) => (
                <div className="col-md-6 col-xl-4 mb-5" key={i}>
                  <EventsCard
                    item={item}
                    link={
                      getPermissions(role).includes('update.events')
                        ? `/dashboard/events/${item.slug}`
                        : null
                    }
                    onDelete={
                      getPermissions(role).includes('delete.events')
                        ? () => handleDelete(item.id)
                        : null
                    }
                  />
                </div>
              ))}
            </div>

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
  events: PropTypes.array,
  eventsCount: PropTypes.number
};

export default withAuth(Events);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let events = [];
  let eventsCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/events', {
      ...config,
      params: { _limit: PAGE_SIZE_ALT }
    });
    events = data;
    const { data: countData } = await axios.get('/events/count', config);
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
