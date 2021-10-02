import classnames from 'classnames';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Book,
  DashboardCard,
  DashboardHeading
} from '../../components/dashboard';
import styles from '../../styles/dashboard/pages/home.module.scss';
import {
  BOOKS,
  MEETINGS,
  PAYMENT_DETAILS,
  PAYMENT_HEADERS
} from '../../utility/constants';
import { MeetingCard, Table } from '../../components/dashboard';
import { getStatus } from '../../utility';

export default function Dashboard() {
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

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Dashboard | NBA-Ikeja</title>
      </Head>

      <div className="section pt-0">
        <div className="container pl-0 pr-0">
          <div className="row">
            {DASHBOARD_CARDS.map((item, i) => (
              <div className="col-md-4">
                <DashboardCard key={i} item={item} />
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

          <div className="row">
            {BOOKS.map((item, i) => (
              <div className="col-md-4 mb-10" key={i}>
                <Book item={item} />
              </div>
            ))}
          </div>
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

              {MEETINGS.slice(0, 3).map((imeeting, j) => (
                <MeetingCard item={imeeting} key={j} />
              ))}
            </div>

            <div className="col-md-7">
              <div className={styles.payment}>
                <DashboardHeading
                  title="Recent Payments"
                  url="/dashboard/payments"
                />

                <Table headers={PAYMENT_HEADERS}>
                  {PAYMENT_DETAILS.map((ipayment, k) => (
                    <tr key={k}>
                      <td>{ipayment.title}</td>
                      <td>{getStatus(ipayment.status)}</td>
                      <td>{ipayment.date}</td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
