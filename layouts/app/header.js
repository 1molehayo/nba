import classnames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from '../../styles/app/layouts/header.module.scss';
import Logo from '../../assets/images/logo.png';
import { Dropdown } from '../../components/global/dropdown';
import { MEDIA_MENU } from '../../utility/constants';
import { useAppContext } from '../../contexts/appContext';

const AppHeader = ({ toggleModal }) => {
  const { isLargeTab, isMenuOpen, toggleMenu, closeMenu } = useAppContext();
  const router = useRouter();

  const goToPage = (url) => {
    toggleMenu();
    router.push(url);
  };

  if (isLargeTab) {
    return (
      <header
        className={classnames('header', styles.mobile, {
          [styles.mobile__opened]: isMenuOpen
        })}
      >
        <div className={styles.mobile__container}>
          <div className="container h-100">
            <div className={styles.mobile__inner}>
              <span
                role="button"
                onClick={() => {
                  closeMenu();
                  router.push('/');
                }}
                className={styles.mobile__logo}
              >
                <Image
                  src={Logo}
                  alt="NBA Ikeja logo"
                  width={151}
                  height={37}
                />
              </span>

              <div
                role="button"
                onClick={() => toggleMenu()}
                className={classnames(styles.mobile__toggler, {
                  [styles.mobile__toggler__opened]: isMenuOpen
                })}
              >
                <div id="header__bars">
                  <div
                    className={classnames(styles.mobile__topbar, {
                      [styles.mobile__topbar__opened]: isMenuOpen
                    })}
                  ></div>
                  <div
                    className={classnames(styles.mobile__bottombar, {
                      [styles.mobile__bottombar__opened]: isMenuOpen
                    })}
                  ></div>
                </div>
              </div>
            </div>

            <ul className={styles.mobile__nav}>
              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/')}
                  className={styles.nav__link}
                >
                  Home
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/news')}
                  className={styles.nav__link}
                >
                  News
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/events')}
                  className={styles.nav__link}
                >
                  Events
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/about-us')}
                  className={styles.nav__link}
                >
                  About us
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/dashboard/login')}
                  className={styles.nav__link}
                >
                  Members Portal
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => {
                    toggleMenu();
                    toggleModal();
                  }}
                >
                  <a className={styles.nav__link}>Live TV</a>
                </span>
              </li>

              <li className={styles.mobile__nav__item}>
                <span
                  role="button"
                  onClick={() => goToPage('/find-lawyer')}
                  className={styles.nav__link}
                >
                  Find a lawyer
                </span>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={classnames('header', styles.wrapper)}>
      <div className="container">
        <div className={styles.container}>
          <Link href="/">
            <a className={styles.logo}>
              <Image src={Logo} alt="NBA Ikeja logo" width={221} height={55} />
            </a>
          </Link>

          <nav className={styles.nav}>
            <Link href="/">
              <a
                className={classnames(styles.nav__link, {
                  [styles.nav__link__active]: router.pathname === '/'
                })}
              >
                Home
              </a>
            </Link>

            <Dropdown
              items={MEDIA_MENU}
              title="Media"
              isActive={
                router.pathname === '/news' || router.pathname === '/events'
              }
            />

            <Link href="/about-us">
              <a
                className={classnames(styles.nav__link, {
                  [styles.nav__link__active]: router.pathname === '/about-us'
                })}
              >
                About us
              </a>
            </Link>

            <Link href="/dashboard/login">
              <a
                className={classnames(styles.nav__link, {
                  [styles.nav__link__active]:
                    router.pathname === '/dashboard/login'
                })}
              >
                Members Portal
              </a>
            </Link>

            <button className={styles.nav__tv} onClick={toggleModal}>
              <span className={styles.nav__tv__icon}>
                <span className="icon-tv" />
                <span className="icon-play color-green" />
              </span>

              <span className={styles.nav__tv__text}>Live TV</span>
            </button>

            <Link href="/find-lawyer">
              <a className={styles.nav__button}>Find a lawyer</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  toggleModal: PropTypes.func
};

export default AppHeader;
