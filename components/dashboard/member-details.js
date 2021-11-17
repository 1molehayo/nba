import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import classnames from 'classnames';
import { getImagePath, shimmer, toBase64 } from '../../utility';
import styles from '../../styles/dashboard/pages/members.module.scss';

export const MemberDetails = ({ member, status }) => {
  return (
    <div className="row">
      <div className="col-md-5">
        <div className={styles.image}>
          {member?.image && (
            <Image
              src={getImagePath(member?.image?.url)}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 300)
              )}`}
              alt=""
              objectFit="cover"
              layout="fill"
            />
          )}

          {!member?.image && (
            <div className="empty-card h-100 justify-content-center">
              <span className="font-size-xx-large icon-profile" />
            </div>
          )}
        </div>

        <div className="mb-5">
          <p className={styles.title}>Name</p>
          <p
            className={styles.name}
          >{`${member?.first_name} ${member?.last_name}`}</p>
        </div>

        <div className="mb-5">
          <p className={styles.title}>Court Number</p>
          <p className={styles.text}>{member?.court_number}</p>
        </div>

        <div className="mb-5">
          <p className={styles.title}>Phone Number</p>
          <p className={styles.text}>{member?.phone_number}</p>
        </div>

        <div className="mb-5">
          <p className={styles.title}>Email Address</p>
          <p className={styles.text}>{member?.email}</p>
        </div>
      </div>
      <div className="col-md-7">
        <div className="mb-5">
          <p className={styles.title}>Bio</p>
          <p className={styles.text}>{member?.bio || 'N/A'}</p>
        </div>

        <div className="mb-5">
          <p className={styles.title}>Address</p>
          <p className={styles.text}>{member?.address || 'N/A'}</p>
        </div>

        {status && (
          <div className="mb-5">
            <p className={styles.title}>Status</p>
            <p
              className={classnames(styles.text, 'font-bold', {
                'color-red': status === 'blocked',
                'color-primary': status !== 'blocked'
              })}
            >
              {status === 'blocked' ? 'Suspended' : 'Active'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

MemberDetails.propTypes = {
  member: PropTypes.object,
  status: PropTypes.string
};
