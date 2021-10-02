import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/dashboard/components/payment-card.module.scss';
import { formatPrice } from '../../utility';

export const PaymentCard = ({ title, amount }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        <p className={styles.price}>
          <strong>{formatPrice(amount)}</strong>
        </p>
      </div>

      <div className={styles.buttonwrapper}>
        <button className="button button--primary">pay</button>
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string
};
