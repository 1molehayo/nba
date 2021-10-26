import classnames from 'classnames';
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import {
  Book,
  DashboardCard,
  DashboardHeading,
  MeetingCard,
  Table
} from '../../components/dashboard';
import axios from '../../services/axios';
import styles from '../../styles/dashboard/pages/home.module.scss';
import { PAYMENT_HEADERS } from '../../utility/constants';
import { getStatus, getUpcomingMeetings, isArrayEmpty } from '../../utility';
import withAuth from '../../services/with-auth';
import { Empty } from '../../components/global';
import useOnError from '../../services/use-on-error';
import handleApiError from '../../services/handle-api-error';

function Dashboard({ books, meetings, payments, error }) {
  const DASHBOARD_CARDS = [
    {
      title: '1,589',
      desc: 'Books Available',
      icon: 'icon-book'
    },
    {
      title: '7',
      desc: 'Payments Made',
      icon: 'icon-card'
    },
    {
      title: '0',
      desc: 'Pending Payments',
      icon: 'icon-timer'
    }
  ];

  useOnError(error);

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
            <div className="col-md-5">
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

            <div className="col-md-7">
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
                  <Table headers={PAYMENT_HEADERS}>
                    {payments.slice(0, 5).map((ipayment, k) => (
                      <tr key={k}>
                        <td>{ipayment.title}</td>
                        <td>{getStatus(ipayment.status)}</td>
                        <td>{ipayment.date}</td>
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
    const paymentsResponse = await axios.get('/payments', config);
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
