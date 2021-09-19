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
      <header className={classnames("header", styles.header__mobile)}>
        <div className={styles.header__mobile__container}>
          <div>
            <Link href="/">
              <a className={styles.header__mobile__logo}>
                <Image
                  src={Logo}
                  alt="NBA Ikeja logo"
                  width={221}
                  height={55}
                />
              </a>
            </Link>

            <div id="burger">
              <div className={styles.header__mobile__topbar}></div>
              <div className={styles.header__mobile__bottombar}></div>
            </div>
          </div>

          <ul className={styles.header__mobile__nav}>
            <li className={styles.header__mobile__nav__item}>
              <Link href="/">
                <a className={styles.header__nav__link}>Home</a>
              </Link>

              <Link href="/news">
                <a className={styles.header__nav__link}>News</a>
              </Link>

              <Link href="/events">
                <a className={styles.header__nav__link}>Events</a>
              </Link>

              <Link href="/about-us">
                <a className={styles.header__nav__link}>About us</a>
              </Link>

              <Link href="/dashboard/login">
                <a className={styles.header__nav__link}>Members Portal</a>
              </Link>

              <Link href="/live-tv">
                <a className={styles.header__nav__link}>Live TV</a>
              </Link>

              <Link href="/find-lawyer">
                <a className={styles.header__nav__link}>Find a lawyer</a>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }

  return (
    <header className={classnames("header", styles.header)}>
      <div className="container">
        <div className={styles.header__container}>
          <Link href="/">
            <a className={styles.header__logo}>
              <Image src={Logo} alt="NBA Ikeja logo" width={221} height={55} />
            </a>
          </Link>

          <nav className={styles.header__nav}>
            <Link href="/">
              <a className={styles.header__nav__link}>Home</a>
            </Link>

            <Dropdown items={MEDIA_MENU} title="Media" />

            <Link href="/about-us">
              <a className={styles.header__nav__link}>About us</a>
            </Link>

            <Link href="/dashboard/login">
              <a className={styles.header__nav__link}>Members Portal</a>
            </Link>

            <Link href="/live-tv">
              <a className={styles.header__nav__tv}>
                <span className={styles.header__nav__tv__icon}>
                  <span className="icon-tv" />
                  <span className="icon-play" />
                </span>

                <span className={styles.header__nav__tv__text}>Live TV</span>
              </a>
            </Link>

            <Link href="/find-lawyer">
              <a className={styles.header__nav__button}>Find a lawyer</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
