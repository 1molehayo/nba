import "../styles/global/main.scss";
import { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import AppLayout from "../layouts/app";
import DashboardLayout from "../layouts/dashboard";
import { AppProvider } from "../contexts/appContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageType, setPageType] = useState("app");

  /*  TODO:
      1. Get page type from router --- DONE
      2. Get user access type from backend using context and usereducer
  */

  useLayoutEffect(() => {
    if (router.pathname.includes("dashboard")) {
      setPageType("admin");
    } else {
      setPageType("app");
    }
  }, [router.pathname]);

  if (pageType === "admin") {
    return (
      <AppProvider>
        <DashboardLayout
          hasSidebar={pageProps.hasSidebar}
          hasNav={pageProps.hasNav}
        >
          <Component {...pageProps} />
        </DashboardLayout>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

export default MyApp;
