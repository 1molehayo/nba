import '../styles/global/main.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { AppProvider } from '../contexts/app-context';
import { Loader } from '../components/global';
import { Layout } from '../layouts';

function MyApp({ Component, pageProps }) {
  const [actPreload, setActPreload] = useState(true);

  /*  TODO:
      1. Get page type from router --- DONE
      2. Get user access type from backend using context and usereducer --DONE
  */

  useEffect(() => {
    const timeout = setTimeout(() => setActPreload(false), 2000);
    ReactModal.setAppElement(document.getElementById('root'));

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (actPreload) {
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
