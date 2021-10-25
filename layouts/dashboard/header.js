import { useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import axios from '../../services/axios';
import { Dropdown } from '../../components/global/dropdown';
import { Searchbar } from '../../components/global';
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

const DashboardHeader = () => {
  const [searchValue, setSearchValue] = useState();
  const user = useCurrentUser();
  const { image, loading, isAuthenticated } = user;
  const dispatch = useDispatchCurrentUser();

  const handleLogout = async () => {
    dispatch({ type: LOGOUT_START });

    try {
      await axios.post('/logout');
      dispatch({ type: LOGOUT_COMPLETED });
    } catch (err) {
      const errorObj = handleApiError();
      // eslint-disable-next-line no-console
      console.log(errorObj);
      // setError(errorObj);
    }
  };

  const handleSearch = async () => {
    // await api call
    // eslint-disable-next-line no-console
    console.log(`searched for ${searchValue}`);
  };

  const ProfileImage = (
    <Image
      src={getImagePath(image?.url)}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
      alt="user avatar"
      width={60}
      height={60}
      objectFit="cover"
      objectPosition="center"
    />
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
          <Searchbar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            placeholder="Search"
            className="searchbar--sm"
          />

          <div className={styles.profile}>
            <Dropdown
              titleNode={isAuthenticated && !loading ? ProfileImage : null}
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
