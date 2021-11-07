/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../services/axios';
import styles from '../../styles/dashboard/components/payment-card.module.scss';
import { formatPrice, notify } from '../../utility';
import FlutterwaveButton from './flutterwave-button';
import { useCurrentUser } from '../../contexts/current-user';
import { PAYMENT_GATEWAY } from '../../utility/constants';
import handleApiError from '../../services/handle-api-error';

export const PaymentCard = ({ title, amount, payments, updatePayments }) => {
  const { email, phone_number, first_name, last_name } = useCurrentUser();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const flutterwaveRef = useRef(null);
  const { uid } = useCurrentUser();

  const createOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        payment_details: title,
        amount: amount.toFixed(2),
        status: 'pending',
        gateway: PAYMENT_GATEWAY,
        uid
      };

      const { data } = await axios.post('/payments', orderData);

      setOrder(data);
      flutterwaveRef.current.click();
    } catch (err) {
      const error = handleApiError(err);

      notify({
        type: 'error',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        <p className={styles.price}>
          <strong>{formatPrice(amount)}</strong>
        </p>
      </div>

      <div className={styles.buttonwrapper}>
        <div className="relative">
          <button
            className="button button--primary"
            disabled={loading}
            onClick={createOrder}
          >
            {loading ? 'Loading...' : 'Pay'}
          </button>

          <FlutterwaveButton
            className="flutterwave-button"
            ref={flutterwaveRef}
            transactionRef={order?.transaction_ref}
            amount={amount}
            title={title.toLowerCase()}
            description={`Payment for ${title.toLowerCase()}`}
            payments={payments}
            updatePayments={updatePayments}
            customer={{
              email,
              phonenumber: phone_number,
              name: `${first_name} ${last_name}`
            }}
          />
        </div>
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  amount: PropTypes.number,
  payments: PropTypes.array,
  title: PropTypes.string,
  updatePayments: PropTypes.func
};
