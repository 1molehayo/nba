import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from '../../styles/app/components/lawyer-card.module.scss';
import {
  formatCharLength,
  getImagePath,
  shimmer,
  toBase64
} from '../../utility';
import { TEXT_RESTRICTIONS } from '../../utility/constants';

export const LawyerCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className="text-center">
        {item.image && (
          <Image
            className={styles.image}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(128, 128)
            )}`}
            alt={item.first_name}
            width={128}
            height={128}
            objectFit="cover"
            objectPosition="center top"
            src={getImagePath(item.image.url)}
          />
        )}

        {!item.image && (
          <div
            style={{
              width: 128,
              height: 128,
              backgroundColor: '#eee',
              borderRadius: 128,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <div className="empty-card h-100 justify-content-center">
              <span className="font-size-m-large icon-profile" />
            </div>
          </div>
        )}
      </div>

      <p className={styles.name}>
        {item.first_name} {item.last_name}
      </p>

      <p className={styles.job}>{`${item.job_type} (${item.job_title})`}</p>

      <hr className="divider" />

      <p className={styles.bio}>
        {formatCharLength(item.bio, TEXT_RESTRICTIONS.short_text) || 'N/A'}
      </p>

      <div className={styles.social}>
        <hr className="divider" />

        {item.phone_number && item.phone_number && (
          <a href={`tel:${item.phone_number}`}>
            <span className="icon-phone" />
          </a>
        )}

        {item.email && (
          <a href={`mailto:${item.email}`}>
            <span className="icon-gmail" />
          </a>
        )}

        {item.social_media && item.social_media.linkedin && (
          <a target="_blank" rel="noreferrer" href={item.social_media.linkedin}>
            <span className="icon-linkedin" />
          </a>
        )}
      </div>
    </div>
  );
};

LawyerCard.propTypes = {
  item: PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    job_title: PropTypes.string,
    job_type: PropTypes.string,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    phone_number: PropTypes.string,
    social_media: PropTypes.shape({
      linkedin: PropTypes.string
    })
  })
};
