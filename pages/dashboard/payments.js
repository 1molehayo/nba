import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import withAuth from '../../services/with-auth';
import useOnError from '../../services/use-on-error';
import { parseCookies } from 'nookies';
import { PaymentCard, Table } from '../../components/dashboard';
import { PAYMENT_HEADERS } from '../../utility/constants';
import { getStatus, isArrayEmpty } from '../../utility';
import { Empty } from '../../components/global';

function Payments({ dues, payments, error }) {
  useOnError(error);

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
                <PaymentCard title={due.title} amount={due.amount} />
              </div>
            ))}
          </div>
        </div>

        <div className="section pt-0">
          <h4 className="pb-5">Payment History</h4>

          {isArrayEmpty(payments) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-card"
              desc="You have not made any payments"
            />
          )}

          {!isArrayEmpty(payments) && (
            <Table headers={PAYMENT_HEADERS}>
              {payments.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.payment_details}</td>
                  <td>{item.amount}</td>
                  <td>{getStatus(item.status)}</td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </section>
  );
}

Payments.propTypes = {
  dues: PropTypes.array,
  error: PropTypes.object,
  payments: PropTypes.array
};

export default withAuth(Payments);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let dues = null;
  let payments = null;
  let error = {};

  try {
    const duesResponse = await axios.get('/dues', config);
    dues = duesResponse.data;
    const paymentsResponse = await axios.get('/payments', config);
    payments = paymentsResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return {
      props: {
        dues,
        payments,
        error
      } // will be passed to the page component as props
    };
  }
}
