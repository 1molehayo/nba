import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/app/components/banner.module.scss";

export const Banner = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className="container">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
};
