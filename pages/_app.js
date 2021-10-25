import '../styles/global/main.scss';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { AppProvider } from '../contexts/app-context';
import { Loader } from '../components/global';
import { Layout } from '../layouts';

function MyApp({ Component, pageProps }) {
  const [actPreload, setActPreload] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setActPreload(false), 2000);
    ReactModal.setAppElement(document.getElementById('root'));

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  if (actPreload || loading) {
    return <Loader />;
  }

  return (
    <AppProvider>
      <Layout Component={Component} pageProps={pageProps} />
    </AppProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
};

export default MyApp;
