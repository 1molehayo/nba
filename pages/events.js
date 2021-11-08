import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../components/app';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import { Empty, EventsCard, Loader } from '../components/global';
import { getStartPage, isArrayEmpty, notify } from '../utility';
import useOnError from '../services/use-on-error';
import { PAGE_SIZE_ALT } from '../utility/constants';
import Pagination from '../components/global/pagination';

export default function Events({ events, eventsCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventData, setEvents] = useState(events);
  const [loading, setLoading] = useState(false);

  useOnError(error);

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/events?_start=${getStartPage(page)}&_limit=${PAGE_SIZE_ALT}`
      );
      setEvents(data);
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
    <section className="events">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      <Banner title="Events" />

      <div className="section container">
        {isArrayEmpty(eventData) && (
          <div className="mt-8">
            <Empty icon="icon-calendar" />
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

          {eventsCount > PAGE_SIZE_ALT && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={eventsCount}
                pageSize={PAGE_SIZE_ALT}
                onPageChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
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
  let events = null;
  let eventsCount = 0;
  let error = null;

  try {
    const { data } = await axios.get('/events?_start=1&_limit=12');
    events = data;
    const countResponse = await axios.get('/events/count');
    eventsCount = countResponse.data;
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
