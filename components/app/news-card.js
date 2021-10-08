import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/app/components/news-card.module.scss';
import PropTypes from 'prop-types';
import { formatCharLength } from '../../utility';
import moment from 'moment';

export const NewsCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          src={`${process.env.API_BASE_URL}${item.image.url}`}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.body}>
        <p className={styles.date}>
          {moment(item.published_at).format('Do MMM YYYY')}
        </p>
        <p className={styles.title}>{formatCharLength(item.title, 50)}</p>
        <p className="font-size-small">
          {formatCharLength(item.short_description, 70)}
        </p>

        <Link href={`/news/${item.id}`}>
          <a className="button--link">
            Read more <span className="icon-right-arrow ml-5" />
          </a>
        </Link>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  item: PropTypes.object
};
