import styles from "../../styles/app/layouts/header.module.scss";
import classnames from "classnames";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";

const AppHeader = () => {
  return (
    <header className={classnames("header", styles.header)}>
      <div className="container">
        <div className={styles.header__container}>
          <Link href="/">
            <a className="header__logo">
              <Image src={Logo} alt="NBA Ikeja logo" width={221} height={55} />
            </a>
          </Link>

          <nav className={styles.header__nav}>
            <Link href="/">
              <a className={styles.header__nav__link}>Home</a>
            </Link>

            <span className={styles.header__nav__link}>Dropdown</span>

            <Link href="/about-us">
              <a className={styles.header__nav__link}>About us</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
