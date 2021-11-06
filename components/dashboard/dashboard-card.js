import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard/components/dashboard-card.module.scss';

export const DashboardCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.desc}>{item.desc}</p>
      </div>
      <div className={styles.icon}>
        <span className={item.icon} />
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    desc: PropTypes.string,
    icon: PropTypes.string
  })
};
