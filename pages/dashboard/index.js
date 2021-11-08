import classnames from 'classnames';
import React from 'react';
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
import {
  formatPrice,
  getStatus,
  getUpcomingMeetings,
  isArrayEmpty
} from '../../utility';
import withAuth from '../../services/with-auth';
import { Empty } from '../../components/global';
import useOnError from '../../services/use-on-error';
import handleApiError from '../../services/handle-api-error';

function Dashboard({ books, meetings, payments, error }) {
  useOnError(error);

  const DASHBOARD_CARDS = [
    {
      title: books?.length,
      desc: 'Books Available',
      icon: 'icon-book'
    },
    {
      title: payments?.length,
      desc: 'Payments Made',
      icon: 'icon-card'
    },
    {
      title: getUpcomingMeetings(meetings)?.length,
      desc: 'Upcoming Meetings',
      icon: 'icon-timer'
    }
  ];

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Dashboard | NBA-Ikeja</title>
      </Head>

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
              {books.slice(0, 3).map((item, i) => (
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

              {isArrayEmpty(getUpcomingMeetings(meetings)) && (
                <Empty
                  className="mt-5 color-black"
                  icon="icon-meeting"
                  desc="No meetings available"
                />
              )}

              {getUpcomingMeetings(meetings)
                .slice(0, 3)
                .map((imeeting, j) => (
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
                    className="mt-5 color-black"
                    icon="icon-card"
                    desc="You have not made any payments"
                  />
                )}

                {!isArrayEmpty(payments) && (
                  <Table headers={DASHBOARD_PAYMENT_HEADERS}>
                    {payments.slice(0, 5).map((ipayment, k) => (
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
  meetings: PropTypes.array,
  payments: PropTypes.array
};

export default withAuth(Dashboard);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let books = null;
  let meetings = null;
  let payments = null;
  let error = {};

  try {
    const meetingResponse = await axios.get('/meetings', config);
    meetings = meetingResponse.data;
    const bookResponse = await axios.get('/books', config);
    books = bookResponse.data;
    const paymentsResponse = await axios.get(
      '/payments?_start=1&_limit=5',
      config
    );
    payments = paymentsResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        books,
        error,
        meetings,
        payments
      } // will be passed to the page component as props
    };
  }
}
