import styles from "../../styles/dashboard/layouts/sidebar.module.scss";
// import classnames from "classnames";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className="container">
        <div className="">
          <Link href="/">
            <a className="">Logo</a>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
