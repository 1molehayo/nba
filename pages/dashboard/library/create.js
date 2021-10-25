import React from 'react';
import BookForm from '../../../components/dashboard/forms/book';
import withAuth from '../../../services/with-auth';

function NewBook() {
  return <BookForm />;
}

export default withAuth(NewBook);
