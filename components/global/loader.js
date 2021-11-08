import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

export const Loader = ({ inline }) => {
  return (
    <div
      className={Classnames('loader__wrapper', {
        'loader__wrapper--inline': inline
      })}
    >
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  inline: PropTypes.bool
};
