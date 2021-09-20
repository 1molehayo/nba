import styles from "../../styles/app/layouts/header.module.scss";
import classnames from "classnames";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { Dropdown } from "../../components/global/dropdown";
import { MEDIA_MENU } from "../../utility/constants";
import { useAppContext } from "../../contexts/appContext";

const AppHeader = () => {
  const { isLargeTab } = useAppContext();

  if (isLargeTab) {
    return (
      <header className={classnames("header", styles.mobile)}>
        <div className={styles.mobile__container}>
          <div className="container">
            <div className=" d-flex justify-content-between align-items-center">
              <Link href="/">
                <a className={styles.mobile__logo}>
                  <Image
                    src={Logo}
                    alt="NBA Ikeja logo"
                    width={151}
                    height={37}
                  />
                </a>
              </Link>

              <div className={styles.mobile__toggler}>
                <div id="header__bars">
                  <div className={styles.mobile__topbar}></div>
                  <div className={styles.mobile__bottombar}></div>
                </div>
              </div>
            </div>
          </div>

          <ul className={styles.mobile__nav}>
            <li className={styles.mobile__nav__item}>
              <Link href="/">
                <a className={styles.nav__link}>Home</a>
              </Link>

              <Link href="/news">
                <a className={styles.nav__link}>News</a>
              </Link>

              <Link href="/events">
                <a className={styles.nav__link}>Events</a>
              </Link>

              <Link href="/about-us">
                <a className={styles.nav__link}>About us</a>
              </Link>

              <Link href="/dashboard/login">
                <a className={styles.nav__link}>Members Portal</a>
              </Link>

              <Link href="/live-tv">
                <a className={styles.nav__link}>Live TV</a>
              </Link>

              <Link href="/find-lawyer">
                <a className={styles.nav__link}>Find a lawyer</a>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }

  return (
    <header className={classnames("header", styles.wrapper)}>
      <div className="container">
        <div className={styles.container}>
          <Link href="/">
            <a className={styles.logo}>
              <Image src={Logo} alt="NBA Ikeja logo" width={221} height={55} />
            </a>
          </Link>

          <nav className={styles.nav}>
            <Link href="/">
              <a className={styles.nav__link}>Home</a>
            </Link>

            <Dropdown items={MEDIA_MENU} title="Media" />

            <Link href="/about-us">
              <a className={styles.nav__link}>About us</a>
            </Link>

            <Link href="/dashboard/login">
              <a className={styles.nav__link}>Members Portal</a>
            </Link>

            <Link href="/live-tv">
              <a className={styles.nav__tv}>
                <span className={styles.nav__tv__icon}>
                  <span className="icon-tv" />
                  <span className="icon-play color-green" />
                </span>

                <span className={styles.nav__tv__text}>Live TV</span>
              </a>
            </Link>

            <Link href="/find-lawyer">
              <a className={styles.nav__button}>Find a lawyer</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
