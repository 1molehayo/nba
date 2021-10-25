import Head from 'next/head';
import PropTypes from 'prop-types';
import { Banner } from '../components/app';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import { Empty, EventsCard } from '../components/global';
import { isArrayEmpty } from '../utility';
import useOnError from '../services/use-on-error';

export default function Events({ events, error }) {
  useOnError(error);

  return (
    <section className="events">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      <Banner title="Events" />

      <div className="section container">
        {!isArrayEmpty(events) && (
          <div className="row">
            {events.map((item, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <EventsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {isArrayEmpty(events) && (
          <div className="mt-8">
            <Empty icon="icon-calendar" />
          </div>
        )}
      </div>
    </section>
  );
}

Events.propTypes = {
  error: PropTypes.object,
  events: PropTypes.object
};

export async function getServerSideProps() {
  let events = null;
  let error = null;

  try {
    const { data } = await axios.get('/events');
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
