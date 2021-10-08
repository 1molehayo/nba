import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image';

export const Empty = ({ icon, desc, imageSrc, className }) => (
  <div className="empty-card">
    <div className={classnames('empty-card__inner', className)}>
      {!imageSrc && <span className={classnames('empty-card__icon', icon)} />}

      {imageSrc && (
        <Image
          alt="empty"
          width={100}
          height={100}
          objectFit="cover"
          src={imageSrc}
          className={classnames('empty-card__image', icon)}
        />
      )}

      <p className="font-medium">{desc || 'No data was found!'}</p>
    </div>
  </div>
);

Empty.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.string,
  imageSrc: PropTypes.string
};
