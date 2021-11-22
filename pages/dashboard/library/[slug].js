import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import axios from '../../../services/axios';
import BookForm from '../../../components/dashboard/forms/book';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import withAuth from '../../../services/with-auth';
import { Loader } from '../../../components/global';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions, notify } from '../../../utility';
import useAuthGuard from '../../../services/use-auth-guard';
import useFetch from '../../../services/use-fetch';
import { FETCHING } from '../../../utility/constants';

function BookDetails({ slug }) {
  const [deleting, setDeleting] = useState(false);

  useAuthGuard('update.books');

  const { data: book, error, status } = useFetch(`/books?slug=${slug}`, true);

  useOnError(error);

  const router = useRouter();

  const { role } = useCurrentUser();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/books/${book.id}`);

      notify({
        type: 'success',
        message: 'Book deleted successfully'
      });

      router.replace('/dashboard/library');
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {(deleting || status === FETCHING) && <Loader />}

      <BookForm
        data={book || null}
        onDelete={
          getPermissions(role).includes('delete.books') ? handleDelete : null
        }
      />
    </>
  );
}

BookDetails.propTypes = {
  slug: PropTypes.string
};

export default withAuth(BookDetails);

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      slug
    }
  };
}
