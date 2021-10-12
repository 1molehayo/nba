import classnames from 'classnames';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from '../../styles/dashboard/layouts/dashboard.module.scss';
import DashboardFooter from './footer';
import DashboardHeader from './header';
import DashboardSidebar from './sidebar';

export default function DashboardLayout({ children, hasSidebar, hasNav }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasNav && <DashboardHeader />}

      <div
        className={classnames('page__body', { [styles.wrapper]: hasSidebar })}
      >
        {hasSidebar && <DashboardSidebar />}

        <main className={styles.body}>{children}</main>
      </div>

      <DashboardFooter isFixed={hasSidebar} />
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
