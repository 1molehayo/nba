import Head from 'next/head';
import { Banner, EventsCard } from '../components/app';
import { EVENTS } from '../utility/constants';
import axios from '../services/axios';
import handleApiError from '../services/handleApiError';
import { Empty } from '../components/global/empty';
import { isArrayEmpty } from '../utility';

export default function Events({ events }) {
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

export async function getStaticProps() {
  let events = null;
  let error = null;

  try {
    const eventResponse = await axios.get('/events');
    events = eventResponse.data;
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
