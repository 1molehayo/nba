import React, { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import moment from 'moment';
import qs from 'qs';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import withAuth from '../../services/with-auth';
import useOnError from '../../services/use-on-error';
import { PaymentCard, Table } from '../../components/dashboard';
import Pagination from '../../components/global/pagination';
import {
  PAGE_SIZE,
  PAYMENT_DATE_FORMAT,
  PAYMENT_HEADERS
} from '../../utility/constants';
import {
  formatPrice,
  getStartPage,
  getStatus,
  isArrayEmpty,
  notify
} from '../../utility';
import { Empty, Loader } from '../../components/global';

function Payments({ dues, payments, paymentsCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsData, setPayments] = useState(payments);
  const [paymentsDataCount, setPaymentsCount] = useState(paymentsCount);
  const [filterData, setFilter] = useState({
    title: '',
    status: ''
  });

  const [loading, setLoading] = useState(false);

  useOnError(error);

  // eslint-disable-next-line no-unused-vars
  const handleFilter = async () => {
    setLoading(true);

    try {
      const query = qs.stringify({
        _where: [
          { title_contains: filterData.title },
          { status: filterData.status }
        ],
        _start: 1,
        _limit: PAGE_SIZE
      });
      const { data } = await axios.get(`/payments/me?${query}`);
      setPayments(data);

      const countQuery = qs.stringify({
        _where: [
          { title_contains: filterData.title },
          { status: filterData.status }
        ]
      });
      const countResponse = await axios.get(`/payments/count?${countQuery}`);
      setPaymentsCount(countResponse.data);
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const onClear = () => {
    setPayments(payments);
    setPaymentsCount(paymentsCount);
    setCurrentPage(1);
    setFilter({
      title: '',
      status: ''
    });
  };

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const query = qs.stringify({
        _start: getStartPage(page),
        _limit: PAGE_SIZE
      });
      const { data } = await axios.get(`/payments/me?${query}`);
      setPayments(data);
      setCurrentPage(page);
    } catch (err) {
      const errorObj = handleApiError(err);
      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section pt-0">
      <Head>
        <title>Payments | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <h4 className="pb-5">Payments</h4>

          {isArrayEmpty(dues) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-card"
              desc="No dues available"
            />
          )}

          <div className="row">
            {dues.map((due, j) => (
              <div className="col-md-6 col-xl-5 mb-4" key={j}>
                <PaymentCard
                  title={due.title}
                  amount={due.amount}
                  payments={paymentsData}
                  updatePayments={setPayments}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="section pt-0">
          <h4 className="pb-5">Payment History</h4>

          {isArrayEmpty(paymentsData) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-card"
              desc="You have not made any payments"
            />
          )}

          <div className="relative">
            {loading && <Loader inline />}

            {!isArrayEmpty(paymentsData) && (
              <Table headers={PAYMENT_HEADERS}>
                {paymentsData.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {moment(item.updated_at).format(
                        `${PAYMENT_DATE_FORMAT}, hh:mm a`
                      )}
                    </td>
                    <td>{item.payment_details}</td>
                    <td>{formatPrice(item.amount)}</td>
                    <td>{getStatus(item.status)}</td>
                  </tr>
                ))}
              </Table>
            )}

            {!loading && paymentsDataCount > PAGE_SIZE && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={paymentsDataCount}
                  pageSize={PAGE_SIZE}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Payments.propTypes = {
  dues: PropTypes.array,
  error: PropTypes.object,
  payments: PropTypes.array,
  paymentsCount: PropTypes.number
};

export default withAuth(Payments);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token} `
    }
  };

  let dues = null;
  let payments = null;
  let paymentsCount = 0;
  let error = {};

  try {
    const duesResponse = await axios.get('/dues', config);
    dues = duesResponse.data;
    const paymentsResponse = await axios.get(
      '/payments/me?_start=1&_limit=10',
      config
    );
    payments = paymentsResponse.data;
    const { data } = await axios.get('/payments/count', config);
    paymentsCount = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        dues,
        payments,
        paymentsCount,
        error
      } // will be passed to the page component as props
    };
  }
}
