import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../services/axios';
import BookForm from '../../../components/dashboard/forms/book';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import withAuth from '../../../services/with-auth';
import { useRouter } from 'next/router';
import { Loader } from '../../../components/global';

function BookDetails({ book, error }) {
  const [deleting, setDeleting] = useState(false);

  useOnError(error);

  const router = useRouter();

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
      {deleting && <Loader />}

      <BookForm data={book} onDelete={handleDelete} />
    </>
  );
}

BookDetails.propTypes = {
  book: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(BookDetails);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let book = null;
  let error = {};

  try {
    const { slug } = ctx.params;
    const { data } = await axios.get(`/books?slug=${slug}`, config);
    book = { ...data[0] };
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        book,
        error
      }
    };
  }
}
