import React from 'react';
import { DashboardCard } from '../../components/dashboard';
import styles from '../../styles/dashboard/pages/home.module.scss';

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
      <div className="section pt-0">
        <div className="container">
          <div className="row">
            {DASHBOARD_CARDS.map((item, i) => (
              <div className="col-md-4">
                <DashboardCard key={i} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
