import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import moment from 'moment';
import {
  Book,
  DashboardCard,
  DashboardHeading,
  MeetingCard,
  Table
} from '../../components/dashboard';
import axios from '../../services/axios';
import styles from '../../styles/dashboard/pages/home.module.scss';
import {
  DASHBOARD_PAYMENT_HEADERS,
  DATE_FORMAT_VIEW
} from '../../utility/constants';
import { formatPrice, getStatus, isArrayEmpty } from '../../utility';
import withAuth from '../../services/with-auth';
import { Empty, Loader } from '../../components/global';
import useOnError from '../../services/use-on-error';
import handleApiError from '../../services/handle-api-error';

function Dashboard({ books, payments, paymentsMade, error }) {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [errorData, setError] = useState(error);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const query = {
        date_gte: new Date().toISOString(),
        _limit: 3,
        _sort: 'date:DESC'
      };
      const { data } = await axios.get('/meetings', { params: query });
      setMeetings(data || []);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnError(errorData);

  const DASHBOARD_CARDS = [
    {
      title: books.length,
      desc: 'Books Available',
      icon: 'icon-book'
    },
    {
      title: paymentsMade,
      desc: 'Payments Made',
      icon: 'icon-card'
    },
    {
      title: meetings.length,
      desc: 'Upcoming Meetings',
      icon: 'icon-timer'
    }
  ];

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Dashboard | NBA-Ikeja</title>
      </Head>

      {loading && <Loader />}

      <div className="section pt-0">
        <div className="container pl-0 pr-0">
          <div className="row">
            {DASHBOARD_CARDS.map((item, i) => (
              <div className="col-md-4" key={i}>
                <DashboardCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classnames('section', styles.books)}>
        <div className="container">
          <DashboardHeading
            title="Recently added books"
            url="/dashboard/library"
          />

          {isArrayEmpty(books) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-book"
              desc="No books available"
            />
          )}

          {!isArrayEmpty(books) && (
            <div className="row">
              {books.map((item, i) => (
                <div className="col-md-4 mb-10" key={i}>
                  <Book item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xl-4">
              <DashboardHeading
                title="Upcoming Meetings"
                url="/dashboard/meetings"
              />

              {isArrayEmpty(meetings) && (
                <Empty
                  className="mt-5 color-primary"
                  icon="icon-meeting"
                  desc="No meetings available"
                />
              )}

              {meetings.map((imeeting, j) => (
                <MeetingCard item={imeeting} key={j} />
              ))}
            </div>

            <div className="col-md-12 col-xl-8">
              <div className={styles.payment}>
                <DashboardHeading
                  title="Recent Payments"
                  url="/dashboard/payments"
                />

                {isArrayEmpty(payments) && (
                  <Empty
                    className="mt-5 color-primary"
                    icon="icon-card"
                    desc="You have not made any payments"
                  />
                )}

                {!isArrayEmpty(payments) && (
                  <Table headers={DASHBOARD_PAYMENT_HEADERS}>
                    {payments.map((ipayment, k) => (
                      <tr key={k}>
                        <td>
                          {moment(ipayment.updated_at).format(DATE_FORMAT_VIEW)}
                        </td>
                        <td>{ipayment.payment_details}</td>
                        <td>{formatPrice(ipayment.amount)}</td>
                        <td>{getStatus(ipayment.status)}</td>
                      </tr>
                    ))}
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  books: PropTypes.array,
  error: PropTypes.object,
  payments: PropTypes.array,
  paymentsMade: PropTypes.number
};

export default withAuth(Dashboard);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let books = [];
  let payments = [];
  let paymentsMade = 0;
  let error = {};

  try {
    const { data: bookData } = await axios.get('/books', {
      ...config,
      params: { _limit: 3, _sort: 'created_at:DESC' }
    });
    books = bookData;

    const { data: paymentData } = await axios.get('/payments/me', {
      ...config,
      params: { _limit: 5, _sort: 'updated_at:DESC' }
    });
    payments = paymentData;

    const { data: paymentCount } = await axios.get('/payments/count', {
      ...config,
      params: { status: 'successful' }
    });
    paymentsMade = paymentCount;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        books,
        error,
        payments,
        paymentsMade
      } // will be passed to the page component as props
    };
  }
}
