import classnames from 'classnames';
import React from 'react';
import Head from 'next/head';
import moment from 'moment';
import {
  Book,
  DashboardCard,
  DashboardHeading,
  MeetingCard,
  Table
} from '../../components/dashboard';
import styles from '../../styles/dashboard/pages/home.module.scss';
import {
  DASHBOARD_PAYMENT_HEADERS,
  DATE_FORMAT_VIEW
} from '../../utility/constants';
import { formatPrice, getStatus, isArrayEmpty } from '../../utility';
import withAuth from '../../services/with-auth';
import { Empty, Loader } from '../../components/global';
import useOnError from '../../services/use-on-error';
import useDashboardAPIs from '../../services/api-functions/dashboard';

function Dashboard() {
  const {
    books,
    booksCount,
    error,
    loading,
    meetings,
    meetingsCount,
    payments,
    paymentsMade
  } = useDashboardAPIs();

  useOnError(error);

  console.log('meetings: ', meetings);

  const DASHBOARD_CARDS = [
    {
      title: booksCount,
      desc: 'Books Available',
      icon: 'icon-book'
    },
    {
      title: paymentsMade,
      desc: 'Payments Made',
      icon: 'icon-card'
    },
    {
      title: meetingsCount,
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

export default withAuth(Dashboard);
