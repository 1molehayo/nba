import React from 'react';
// import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from '../../styles/app/components/banner.module.scss';

export const Banner = ({ title, hasBackButton }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12">
            <h2>{title}</h2>

            {hasBackButton && (
              <button className="button button--link" onClick={goBack}>
                Go Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  hasBackButton: PropTypes.bool,
  title: PropTypes.string
};
