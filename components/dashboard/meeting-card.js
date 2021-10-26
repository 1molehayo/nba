import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import classnames from 'classnames';
import styles from '../../styles/dashboard/components/meeting-card.module.scss';
import { formatCharLength, getImagePath } from '../../utility';
import { useCurrentPlatform } from '../../contexts/platform-context';
import { TEXT_RESTRICTIONS } from '../../utility/constants';

export const MeetingCard = ({ item, link, onDelete }) => {
  const { platforms } = useCurrentPlatform();

  const getPlatform = () => {
    if (!platforms) {
      return;
    }

    const result = platforms.filter((pitem) => pitem.id === item.platform)[0];
    return result;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.content}>
          {link && (
            <Link href={link} passHref>
              <p
                role="link"
                className={classnames(styles.title, styles.title__link)}
              >
                {item.title}
              </p>
            </Link>
          )}

          {!link && <p className={styles.title}>{item.title}</p>}

          <p className={styles.desc}>
            {formatCharLength(item.description, TEXT_RESTRICTIONS.short_text)}
          </p>
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
        </div>
      </div>

      <div className={styles.buttons}>
        <a
          href={item.url}
          target="_blank"
          className="button button--primary"
          rel="noreferrer"
        >
          Enter
        </a>

        {onDelete && (
          <button onClick={onDelete} className="button button--red ml-4">
            Delete
          </button>
        )}
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
    platform: PropTypes.number,
    slug: PropTypes.string,
    time: PropTypes.any,
    url: PropTypes.string
  }),
  link: PropTypes.string,
  onDelete: PropTypes.func
};
