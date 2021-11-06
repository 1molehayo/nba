import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import logo from '../../assets/images/logo.png';

export default function FlutterwaveButton({
  amount,
  currency,
  customer,
  title,
  description
}) {
  const { publicRuntimeConfig } = getConfig();

  const config = {
    public_key: publicRuntimeConfig.ravePublicKey,
    tx_ref: Date.now(),
    amount,
    currency,
    payment_options: 'card,mobilemoney,ussd',
    customer,
    customizations: {
      title,
      description,
      logo
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      className="button button--primary"
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            // eslint-disable-next-line no-console
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {}
        });
      }}
    >
      Pay
    </button>
  );
}

FlutterwaveButton.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
  customer: PropTypes.shape({
    email: PropTypes.string,
    phonenumber: PropTypes.string,
    name: PropTypes.string
  }),
  description: PropTypes.string,
  title: PropTypes.string
};

FlutterwaveButton.defaultProps = {
  currency: 'NGN'
};
