import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getConfig from 'next/config';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from '../../services/axios';
import { notify } from '../../utility';
import handleApiError from '../../services/handle-api-error';

const FlutterwaveButton = forwardRef((props, ref) => {
  const {
    amount,
    currency,
    customer,
    title,
    description,
    className,
    transactionRef,
    payments,
    updatePayments
  } = props;

  const { publicRuntimeConfig } = getConfig();

  const config = {
    public_key: publicRuntimeConfig.ravePublicKey,
    tx_ref: transactionRef,
    amount,
    currency,
    payment_options: 'card,mobilemoney,ussd',
    customer,
    customizations: {
      title,
      description,
      logo: 'https://nbaikeja.netlify.app/favicon.png'
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  const updateOrder = async (resp) => {
    try {
      const orderData = {
        status: resp.status,
        reference_id: resp.flw_ref
      };
      const { data } = await axios.put(
        `/payments/${transactionRef}`,
        orderData
      );

      let arr = [...payments];
      arr = arr.map((item) => {
        if (item.transaction_ref === data.transaction_ref) {
          return data;
        }

        return item;
      });

      updatePayments(arr);
    } catch (err) {
      const error = handleApiError(err);

      notify({
        type: 'error',
        message: error.message
      });
    } finally {
      closePaymentModal(); // this will close the modal programmatically
    }
  };

  return (
    <button
      ref={ref}
      className={classnames('button button--primary', className)}
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            updateOrder(response);
          },
          onClose: () => {}
        });
      }}
    >
      Pay
    </button>
  );
});

FlutterwaveButton.displayName = 'FlutterwaveButton';

FlutterwaveButton.propTypes = {
  amount: PropTypes.number,
  className: PropTypes.string,
  currency: PropTypes.string,
  customer: PropTypes.shape({
    email: PropTypes.string,
    phonenumber: PropTypes.string,
    name: PropTypes.string
  }),
  description: PropTypes.string,
  payments: PropTypes.array,
  title: PropTypes.string,
  transactionRef: PropTypes.string,
  updatePayments: PropTypes.func
};

FlutterwaveButton.defaultProps = {
  currency: 'NGN'
};

export default FlutterwaveButton;
