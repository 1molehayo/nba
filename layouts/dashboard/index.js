import styles from "../../styles/dashboard/layouts/dashboard.module.scss";
import classnames from "classnames";
import DashboardFooter from "./footer";
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";
import Head from "next/head";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardHeader />

      <main className={classnames("page__body", styles.dashboard)}>
        <DashboardSidebar />

        <div className={styles.dashboard__body}>{children}</div>
      </main>

      <DashboardFooter />
    </>
  );
}
