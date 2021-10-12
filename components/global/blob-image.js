import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// eslint-disable-next-line no-unused-vars
export const BlobImage = ({ image, className }) => {
  return (
    <div className={classnames('blob-image', className)}>
      <svg
        viewBox="0 0 627 587"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
      >
        <clipPath id="mask">
          <path d="M521.875 68.8545C586.46 121.951 636.302 203.03 625.07 272.773C613.698 342.372 541.531 400.634 476.946 459.901C412.361 519.168 355.358 579.726 292.036 586.327C228.715 592.928 158.795 545.572 100.106 486.305C41.4184 427.039 -6.31835 355.574 1.12296 291.859C8.56428 228.143 71.1837 171.89 129.872 118.794C188.56 65.6975 243.598 15.7584 310.71 3.27357C377.962 -9.35471 457.29 15.7583 521.875 68.8545Z" />
        </clipPath>

        <image
          width="100%"
          height="100%"
          clipPath="url(#mask)"
          preserveAspectRatio="xMidYMid slice"
          href={image}
        />
      </svg>
    </div>
  );
};

BlobImage.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string
};
