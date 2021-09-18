import styles from "../../styles/dashboard/layouts/header.module.scss";
import classnames from "classnames";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className={classnames("header", styles.header)}>
      <div className="container">
        <div className="header__container">
          <Link href="/">
            <a className="header__logo">Logo</a>
          </Link>
        </div>

        <hr className="divider" />
      </div>
    </header>
  );
};

export default DashboardHeader;
