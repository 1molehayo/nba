/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import axios from '../../services/axios';
import styles from '../../styles/dashboard/components/payment-card.module.scss';
import { FormField, Loader, Modal, Select } from '../global';
import { formatPrice, isArrayEmpty, notify } from '../../utility';
import handleApiError from '../../services/handle-api-error';

export const PaymentCard = ({ amount, formLabel, title, slug, url }) => {
  const [openModal, setOpenModal] = useState(false);
  const [billings, setBillings] = useState([]);
  const [selectedBill, setSelectedBill] = useState('');
  const [amountFee, setAmountFee] = useState(0);
  const [urlLink, setUrlLink] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDueBillings = async (due) => {
    setLoading(true);

    try {
      const { data } = await axios.get('/billings', {
        params: {
          'due.slug': due
        }
      });
      setBillings(data);
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

  const resetData = () => {
    setSelectedBill('');
    setAmountFee(0);
    setUrlLink('');
    setBillings([]);
  };

  const toggleModal = (dueId) => {
    setOpenModal((prevState) => !prevState);

    if (dueId) {
      fetchDueBillings(dueId);
    } else {
      resetData();
    }
  };

  const getBillDetails = (bill) => {
    if (!bill) {
      return null;
    }

    return billings.filter((item) => item.uid === bill)[0];
  };

  const onSelectBill = (e) => {
    setSelectedBill(e.target.value);
    const result = formatPrice(getBillDetails(e.target.value).amount);
    setAmountFee(result);
    setUrlLink(getBillDetails(e.target.value).url);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={classnames(styles.title, 'text-capitalize')}>{title}</p>

          <p className={styles.price}>
            <strong>{amount ? formatPrice(amount) : 'N/A'}</strong>
          </p>
        </div>

        <div className={styles.buttonwrapper}>
          <div className="relative">
            {url ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={url}
                className="button button--primary w-100"
              >
                Pay
              </a>
            ) : (
              <button
                className="button button--primary"
                onClick={() => toggleModal(slug)}
              >
                Pay
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={() => toggleModal()}
        className={styles.modal__wrapper}
      >
        <div className={styles.modal}>
          {loading && <Loader inline />}

          {!loading && (
            <div className="form">
              <Select
                id="bill"
                label={formLabel}
                onChange={onSelectBill}
                value={selectedBill}
              >
                {!isArrayEmpty(billings) &&
                  billings.map((bItem, i) => (
                    <option key={i} value={`${bItem.uid}`}>
                      {bItem.name}
                    </option>
                  ))}
              </Select>

              <FormField
                id="amount"
                label="Amount"
                value={amountFee}
                disabled
              />

              <div className="mt-4">
                {!urlLink ? (
                  <button className="button button--primary" disabled>
                    Proceed
                  </button>
                ) : (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={urlLink}
                    className="button button--primary"
                  >
                    Proceed
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

PaymentCard.propTypes = {
  amount: PropTypes.number,
  formLabel: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};
