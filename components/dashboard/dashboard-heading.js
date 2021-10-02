import React from 'react';
import Link from 'next/link';
import styles from '../../styles/dashboard/components/dashboard-heading.module.scss';
import PropTypes from 'prop-types';

export const DashboardHeading = ({ title, url }) => {
  return (
    <div className={styles.heading}>
      <h4 className="mb-0">{title}</h4>

      <Link href={url}>
        <a>See all</a>
      </Link>
    </div>
  );
};

DashboardHeading.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};
