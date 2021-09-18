import styles from "../../styles/app/layouts/app.module.scss";
import classnames from "classnames";
import AppFooter from "./footer";
import AppHeader from "./header";
import Head from "next/head";

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <main className={classnames("page__body", styles.app)}>{children}</main>

      <AppFooter />
    </>
  );
}
