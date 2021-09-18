import "../styles/global/main.scss";
import AppLayout from "../layouts/app";
import DashboardLayout from "../layouts/dashboard";

function MyApp({ Component, pageProps }) {
  const pageType = "app";
  /*  TODO:
      Get user access type from backend using context and usereducer
  */

  if (pageType === "admin") {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
