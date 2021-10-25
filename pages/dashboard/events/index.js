import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import { parseCookies } from 'nookies';
import { Empty, EventsCard, Loader } from '../../../components/global';
import { isArrayEmpty, notify } from '../../../utility';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';

function Events({ events, error }) {
  const [eventData, setEvents] = useState(events);
  const [deleting, setDeleting] = useState(false);

  useOnError(error);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/events/${id}`);
      const arr = eventData.filter((item) => item.id !== id);
      setEvents(arr);

      notify({
        type: 'success',
        message: 'Event deleted successfully'
      });
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="section pt-0">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="section pt-0">
          <div className="d-flex justify-content-between pb-5">
            <h4 className="">Events</h4>

            <Link href="/dashboard/events/create" passHref>
              <button className="button button--primary">Create event</button>
            </Link>
          </div>

          {isArrayEmpty(eventData) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-calendar"
              desc="No events available"
            />
          )}

          {eventData && (
            <div className="row">
              {eventData.map((item, i) => (
                <div className="col-md-6 col-xl-4 mb-5" key={i}>
                  <EventsCard
                    item={item}
                    link={`/dashboard/events/${item.slug}`}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Events.propTypes = {
  error: PropTypes.object,
  events: PropTypes.array
};

export default withAuth(Events);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let events = null;
  let error = {};

  try {
    const { data } = await axios.get('/events', config);
    events = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        events,
        error
      } // will be passed to the page component as props
    };
  }
}