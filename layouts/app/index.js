import classnames from 'classnames';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/app/layouts/app.module.scss';
import AppFooter from './footer';
import AppHeader from './header';
import { useAppContext } from '../../contexts/appContext';
import ovalShape from '../../assets/images/oval.svg';
import { VideoModal } from '../../components/app';

export default function AppLayout({ children, hasOval }) {
  const { isLargeTab } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader toggleModal={toggleModal} />

      <main
        className={classnames('page__body', styles.body, {
          [styles.mobile__body]: isLargeTab
        })}
      >
        {children}

        {!isLargeTab && hasOval && (
          <div className="page__oval">
            <Image
              src={ovalShape}
              alt="oval"
              className="page__oval-image"
              width={650}
              height={505}
            />
          </div>
        )}
      </main>

      <VideoModal
        show={showModal}
        onClose={toggleModal}
        link="https://www.youtube.com/embed/xgtLzBL6d0k"
      />

      <AppFooter />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
  hasOval: PropTypes.bool
};

AppLayout.defaultProps = {
  hasOval: true
};
