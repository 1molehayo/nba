import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../styles/dashboard/components/meeting-card.module.scss';
import { formatCharLength, getImagePath } from '../../utility';
import { useCurrentPlatform } from '../../contexts/platform-context';

export const MeetingCard = ({ item }) => {
  const { platforms } = useCurrentPlatform();

  const getPlatform = () => {
    if (!platforms) {
      return;
    }

    const result = platforms.filter((pitem) => pitem.id === item.id)[0];
    return result;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.desc}>{formatCharLength(item.description, 80)}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: item.extra_info
          }}
        ></p>
      </div>

      <div className={styles.time}>
        <div className={styles.image}>
          {getPlatform() && (
            <Image
              src={getImagePath(getPlatform().image.url)}
              alt={getPlatform().name}
              width={65}
              height={24}
            />
          )}
        </div>

        <p className="mb-0">{moment(item.date).format('Do MMM YYYY')}</p>

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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    extra_info: PropTypes.any,
    title: PropTypes.string,
    date: PropTypes.any,
    platform_name: PropTypes.string,
    platform_image: PropTypes.object,
    time: PropTypes.any,
    url: PropTypes.string
  })
};
