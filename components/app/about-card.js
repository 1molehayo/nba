import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from '../../styles/app/components/about-card.module.scss';

export const AboutCard = ({ item }) => {
  return (
    <div role="button" className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          src={item.image}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </div>

      <p className={styles.title}>{item.name}</p>
      <p className={styles.job}>{item.job}</p>
    </div>
  );
};

AboutCard.propTypes = {
  item: PropTypes.object
};
