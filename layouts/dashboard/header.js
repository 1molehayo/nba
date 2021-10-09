import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/dashboard/layouts/header.module.scss';
import Logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/avatar.png';
import { Dropdown } from '../../components/global/dropdown';
import { Searchbar } from '../../components/global';
import { PROFILE_MENU } from '../../utility/constants';

const DashboardHeader = () => {
  const [searchValue, setSearchValue] = useState();

  const handleSearch = async () => {
    // await api call
    // eslint-disable-next-line no-console
    console.log(`searched for ${searchValue}`);
  };

  const ProfileImage = (
    <Image
      src={Avatar}
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
            <Dropdown titleNode={ProfileImage} items={PROFILE_MENU} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
