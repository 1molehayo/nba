import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import { CurrentUserProvider } from '../contexts/current-user';
import { CurrentPlatformProvider } from '../contexts/platform-context';
import AppLayout from './app';
import DashboardLayout from './dashboard';

export const Layout = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageType, setPageType] = useState('app');

  useLayoutEffect(() => {
    if (router.pathname.includes('dashboard')) {
      setPageType('admin');
    } else {
      setPageType('app');
    }
  }, [router.pathname]);

  if (pageType === 'admin') {
    return (
      <CurrentUserProvider>
        <CurrentPlatformProvider>
          <DashboardLayout
            hasSidebar={pageProps.hasSidebar}
            hasNav={pageProps.hasNav}
          >
            <Component {...pageProps} />
          </DashboardLayout>
        </CurrentPlatformProvider>
      </CurrentUserProvider>
    );
  }

  return (
    <AppLayout hasOval={pageProps.hasOval}>
      <Component {...pageProps} />
    </AppLayout>
  );
};

Layout.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
};
