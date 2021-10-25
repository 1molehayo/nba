import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Empty, EventsCard } from '../../global';
import { isArrayEmpty } from '../../../utility';

export default function Events({ data }) {
  return (
    <section className="section section--lg">
      <div className="container">
        <h2 className="color-primary text-center pb-5">Upcoming Events</h2>

        {!isArrayEmpty(data) && (
          <div className="row justify-content-center">
            {data.slice(0, 3).map((item, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <EventsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {isArrayEmpty(data) && <Empty icon="icon-calendar" />}

        {!isArrayEmpty(data) && (
          <div className="text-center mt-5">
            <Link href="/events" passHref>
              <button className="button button--primary">View More</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

Events.propTypes = {
  data: PropTypes.array
};
