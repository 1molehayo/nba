import styles from '../../styles/dashboard/layouts/dashboard.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DashboardFooter from './footer';
import DashboardHeader from './header';
import DashboardSidebar from './sidebar';
import Head from 'next/head';

export default function DashboardLayout({ children, hasSidebar, hasNav }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasNav && <DashboardHeader />}

      <div className={classnames('page__body', styles.wrapper)}>
        {hasSidebar && <DashboardSidebar />}

        <main className={styles.body}>{children}</main>
      </div>

      <DashboardFooter />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  hasNav: PropTypes.bool,
  hasSidebar: PropTypes.bool
};

DashboardLayout.defaultProps = {
  hasSidebar: true,
  hasNav: true
};
