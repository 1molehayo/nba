/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard/components/payment-card.module.scss';
import { formatPrice } from '../../utility';
import FlutterwaveButton from './flutterwave-button';
import { useCurrentUser } from '../../contexts/current-user';

export const PaymentCard = ({ title, amount }) => {
  const { email, phone_number, first_name, last_name } = useCurrentUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        <p className={styles.price}>
          <strong>{formatPrice(amount)}</strong>
        </p>
      </div>

      <div className={styles.buttonwrapper}>
        <FlutterwaveButton
          amount={amount}
          title={title.toLowerCase()}
          description={`Payment for ${title.toLowerCase()}`}
          customer={{
            email,
            phonenumber: phone_number,
            name: `${first_name} ${last_name}`
          }}
        />
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string
};
