import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../styles/app/components/news-card.module.scss';
import { formatCharLength, getImagePath } from '../../utility';

export const NewsCard = ({ item }) => (
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
      <p className={styles.date}>
        {moment(item.published_at).format('Do MMM YYYY')}
      </p>
      <p className={styles.title}>{formatCharLength(item.title, 50)}</p>
      <p className="font-size-small">
        {formatCharLength(item.short_description, 70)}
      </p>

      <Link href={`/news/${item.slug}`}>
        <a className="button--link">
          Read more <span className="icon-right-arrow ml-5" />
        </a>
      </Link>
    </div>
  </div>
);

NewsCard.propTypes = {
  item: PropTypes.object
};
