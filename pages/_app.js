import '../styles/global/main.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import AppLayout from '../layouts/app';
import DashboardLayout from '../layouts/dashboard';
import { AppProvider } from '../contexts/appContext';
import { Loader } from '../components/global';
import ReactModal from 'react-modal';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageType, setPageType] = useState('app');
  const [actPreload, setActPreload] = useState(true);

  /*  TODO:
      1. Get page type from router --- DONE
      2. Get user access type from backend using context and usereducer
  */

  useEffect(() => {
    const timeout = setTimeout(() => setActPreload(false), 2000);
    ReactModal.setAppElement(document.getElementById('root'));

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useLayoutEffect(() => {
    if (router.pathname.includes('dashboard')) {
      setPageType('admin');
    } else {
      setPageType('app');
    }
  }, [router.pathname]);

  if (actPreload) {
    return <Loader />;
  }

  if (pageType === 'admin') {
    return (
      <AppProvider>
        <DashboardLayout
          hasSidebar={pageProps.hasSidebar}
          hasNav={pageProps.hasNav}
        >
          <Component {...pageProps} />
        </DashboardLayout>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <AppLayout hasOval={pageProps.hasOval}>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
};

export default MyApp;
