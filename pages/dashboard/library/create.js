import React from 'react';
import BookForm from '../../../components/dashboard/forms/book';
import withAuth from '../../../services/with-auth';
import useAuthGuard from '../../../services/use-auth-guard';

function NewBook() {
  useAuthGuard('create.books');

  return <BookForm />;
}

export default withAuth(NewBook);
