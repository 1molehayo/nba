import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/dashboard/components/book.module.scss';
import PropTypes from 'prop-types';
import { formatCharLength } from '../../utility';

export const Book = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={item.image} width={108} height={150} objectFit="cover" />
      </div>

      <div className={styles.content}>
        <div>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.author}>
            <em>{item.author}</em>
          </p>
          <p className={styles.desc}>
            {formatCharLength(item.description, 80)}
          </p>
        </div>

        <Link href={`/dashboard/library/${item.id}`} passHref>
          <button className="button button--primary">Read now</button>
        </Link>
      </div>
    </div>
  );
};

Book.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string
  })
};
