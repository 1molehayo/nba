import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  formatCharLength,
  getImagePath,
  shimmer,
  toBase64
} from '../../utility';

export const NewsCard = ({ item, link, onDelete }) => (
  <div className="news-card-wrapper">
    <div className="news-card__image">
      {item.image && (
        <Image
          src={getImagePath(item.image.url)}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 500)
          )}`}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>

    <div className="news-card-body">
      <div>
        <p className="news-card__date">
          {moment(item.published_at).format('Do MMM YYYY')}
        </p>
        <p className="news-card__title">{formatCharLength(item.title, 50)}</p>
        <p className="font-size-small mb-5">
          {formatCharLength(item.short_description, 70)}
        </p>
      </div>

      <div className="d-flex justify-content-between">
        <Link href={link || `/news/${item.slug}`}>
          <a className="button--link p-0 font-size-small">
            Read more <span className="icon-right-arrow ml-1" />
          </a>
        </Link>

        {onDelete && (
          <button
            className="button--link p-0 font-size-small color-red"
            onClick={onDelete}
          >
            Delete <span className="icon-delete ml-1" />
          </button>
        )}
      </div>
    </div>
  </div>
);

NewsCard.propTypes = {
  item: PropTypes.object,
  link: PropTypes.string,
  onDelete: PropTypes.func
};
