import { useRouter } from 'next/router';
import { useCurrentUser } from '../contexts/current-user';
import { isBrowser } from '../utility';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { isAuthenticated } = useCurrentUser();

    // checks whether we are on client / browser or server.
    if (isBrowser()) {
      const router = useRouter();

      // If user is not authenticated we redirect to the login page.
      if (!isAuthenticated) {
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
