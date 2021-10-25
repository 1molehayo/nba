import classnames from 'classnames';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from '../../styles/dashboard/layouts/dashboard.module.scss';
import DashboardFooter from './footer';
import DashboardHeader from './header';
import DashboardSidebar from './sidebar';
import { Loader } from '../../components/global';
import { useDispatchPlatform } from '../../contexts/platform-context';

export default function DashboardLayout({ children, hasSidebar, hasNav }) {
  const { loading } = useDispatchPlatform();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loader />}

      {hasNav && <DashboardHeader />}

      <div
        className={classnames('page__body', { [styles.wrapper]: hasSidebar })}
      >
        {hasSidebar && <DashboardSidebar />}

        <main className={classnames(styles.body, 'scrollbar')}>{children}</main>
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
