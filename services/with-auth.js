import { useRouter } from 'next/router';
import { Loader } from '../components/global';
import { useCurrentUser } from '../contexts/current-user';
import { isBrowser, notify } from '../utility';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { isAuthenticated, loading, active } = useCurrentUser();
    const router = useRouter();

    // checks whether we are on client / browser or server.
    if (isBrowser()) {
      if (loading) {
        return <Loader />;
      }

      // If user account has been deactivated we redirect to the login page.
      if (!loading && isAuthenticated && !active) {
        notify({
          type: 'error',
          message:
            'Your account has been deactivated, please reach out to the administrator'
        });
        router.replace('/dashboard/login');
      }

      // If user is not authenticated we redirect to the login page.
      if (!loading && !isAuthenticated) {
        router.replace('/dashboard/login');
        return null;
      }

      // If user is authenticated we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
