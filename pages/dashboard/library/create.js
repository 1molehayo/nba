import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BookForm from '../../../components/dashboard/forms/book';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions } from '../../../utility';
import withAuth from '../../../services/with-auth';

function NewBook() {
  const router = useRouter();
  const { role } = useCurrentUser();

  useEffect(() => {
    if (!getPermissions(role).includes('create.books')) {
      router.replace('/dashboard/library');
    }
  }, [role, router]);

  return <BookForm />;
}

export default withAuth(NewBook);
