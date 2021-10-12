import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import Zoom from '../../assets/images/zoom.png';
import styles from '../../styles/dashboard/components/meeting-card.module.scss';
import { formatCharLength } from '../../utility';

export const MeetingCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.desc}>{formatCharLength(item.description, 80)}</p>
      </div>

      <div className={styles.time}>
        <div className={styles.image}>
          <Image
            src={Zoom.src}
            alt="zoom"
            placeholder={Zoom.blurDataURL}
            width={65}
            height={24}
          />
        </div>

        <p className="mb-0">
          {moment(item.date, 'DD/MM/YYYY').format('Do MMM YYYY')}
        </p>
        <p>{item.time}</p>

        <a
          href={item.url}
          target="_blank"
          className="button button--primary"
          rel="noreferrer"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

MeetingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    url: PropTypes.string
  })
};
