import { useRouter } from 'next/router';
import { Loader } from '../components/global';
import { useCurrentUser } from '../contexts/current-user';
import { isBrowser } from '../utility';

const isAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { isAuthenticated, loading, active } = useCurrentUser();

    // checks whether we are on client / browser or server.
    if (isBrowser()) {
      const router = useRouter();

      if (loading) {
        return <Loader />;
      }

      // If user is not authenticated we redirect to the login page.
      if (!loading && isAuthenticated && active) {
        router.replace('/dashboard');
        return null;
      }

      // If user is authenticated we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default isAuth;
