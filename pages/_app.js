import "../styles/global/main.scss";
import PropTypes from "prop-types";
import AppLayout from "../layouts/app";
import DashboardLayout from "../layouts/dashboard";
import { AppProvider } from "../contexts/appContext";

function MyApp({ Component, pageProps }) {
  const pageType = "app";
  /*  TODO:
      Get user access type from backend using context and usereducer
  */

  if (pageType === "admin") {
    return (
      <AppProvider>
        <DashboardLayout>
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
