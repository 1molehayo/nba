import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard/components/dashboard-heading.module.scss';

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
