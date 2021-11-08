import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCurrentUser } from '../contexts/current-user';
import { getPermissions } from '../utility';

const useAuthGuard = (permission) => {
  const { role } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!getPermissions(role).includes(permission)) {
      router.replace('/dashboard');
    }

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, role]);
};

export default useAuthGuard;
