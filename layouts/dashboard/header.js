import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import axios from '../../services/axios';
import { Dropdown } from '../../components/global/dropdown';
import {
  LOGOUT_COMPLETED,
  LOGOUT_START,
  PROFILE_MENU
} from '../../utility/constants';
import styles from '../../styles/dashboard/layouts/header.module.scss';
import Logo from '../../assets/images/logo.png';
import handleApiError from '../../services/handle-api-error';
import {
  useCurrentUser,
  useDispatchCurrentUser
} from '../../contexts/current-user';
import { getImagePath, shimmer, toBase64 } from '../../utility';
import useOnError from '../../services/use-on-error';

const DashboardHeader = () => {
  const user = useCurrentUser();
  const [error, setError] = useState();
  const { image, loading, isAuthenticated } = user;
  const dispatch = useDispatchCurrentUser();

  const handleLogout = async () => {
    dispatch({ type: LOGOUT_START });

    try {
      await axios.post('/logout');
      dispatch({ type: LOGOUT_COMPLETED });
    } catch (err) {
      const errorObj = handleApiError();
      setError(errorObj);
    }
  };

  useOnError(error);

  const ProfileImage = (
    <Image
      src={getImagePath(image?.formats?.thumbnail?.url)}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
      alt="user avatar"
      width={60}
      height={60}
      objectFit="cover"
      objectPosition="center"
    />
  );

  const EmptyImage = (
    <div
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 60
      }}
    >
      <div className="empty-card h-100 justify-content-center">
        <span className="font-size-large icon-profile" />
      </div>
    </div>
  );

  return (
    <header className={classnames('header', styles.wrapper)}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src={Logo} alt="NBA Ikeja logo" width={151} height={37} />
          </a>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.profile}>
            <Dropdown
              titleNode={
                isAuthenticated && !loading && getImagePath(image?.url)
                  ? ProfileImage
                  : EmptyImage
              }
              items={PROFILE_MENU}
              buttonlinks={{ logout: () => handleLogout() }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
