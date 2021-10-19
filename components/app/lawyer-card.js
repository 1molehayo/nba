import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from '../../styles/app/components/lawyer-card.module.scss';
import { formatCharLength, shimmer, toBase64 } from '../../utility';

export const LawyerCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className="text-center">
        <Image
          className={styles.image}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(128, 128)
          )}`}
          alt={item.name}
          width={128}
          height={128}
          objectFit="cover"
          objectPosition="center top"
          src={item.image}
        />
      </div>

      <p className={styles.name}>{item.name}</p>
      <p className={styles.job}>{item.job}</p>

      <hr className="divider" />

      <p className={styles.bio}>{formatCharLength(item.bio, 80)}</p>

      <div className={styles.social}>
        <hr className="divider" />

        {item.social_media.phone && (
          <a href={`tel:${item.social_media.phone}`}>
            <span className="icon-phone" />
          </a>
        )}

        {item.social_media.email && (
          <a href={`tel:${item.social_media.email}`}>
            <span className="icon-gmail" />
          </a>
        )}

        {item.social_media.linkedin && (
          <a href={`tel:${item.social_media.linkedin}`}>
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
    id: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    job: PropTypes.string,
    name: PropTypes.string,
    social_media: PropTypes.shape({
      email: PropTypes.string,
      linkedin: PropTypes.string,
      phone: PropTypes.string
    })
  })
};
