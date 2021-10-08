import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image';

export const Empty = ({ icon, desc, imageSrc }) => {
  return (
    <div className="empty-card">
      <div className="empty-card__inner">
        {!imageSrc && <span className={classnames('empty-card__icon', icon)} />}

        {imageSrc && (
          <Image
            width={100}
            height={100}
            objectFit="cover"
            src={imageSrc}
            className={classnames('empty-card__image', icon)}
          />
        )}

        <p>{desc || 'No data was found!'}</p>
      </div>
    </div>
  );
};

Empty.propTypes = {
  desc: PropTypes.string,
  icon: PropTypes.string,
  imageSrc: PropTypes.string
};
