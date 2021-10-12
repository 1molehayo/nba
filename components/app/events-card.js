import React, { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../styles/app/components/events-card.module.scss';
import { formatCharLength, getImagePath } from '../../utility';

export const EventsCard = ({ item }) => {
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          src={getImagePath(item.image.url)}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.body}>
        <p role="button" onClick={toggleModal} className={styles.title}>
          {item.title}
        </p>

        <p className="font-size-small mb-4">
          {formatCharLength(item.description, 100)}
        </p>

        <hr className="divider" />

        <div className="row mt-3">
          <div className="col-6">
            <p>
              <strong>Date &amp; Time</strong>
            </p>
            <p className="font-size-small">
              {moment(item.date, 'YYYY-MM-DD').format('Do MMM YYYY')},<br />
              {moment(item.time, 'HH:mm:ss').format('HH:mm')}
            </p>
          </div>

          <div className="col-6">
            <p>
              <strong>Venue</strong>
            </p>

            <p className="font-size-small">
              {formatCharLength(item.venue, 35)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

EventsCard.propTypes = {
  item: PropTypes.object
};
