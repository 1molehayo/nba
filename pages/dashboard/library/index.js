import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import { Book } from '../../../components/dashboard';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import withAuth from '../../../services/with-auth';
import { Empty, Loader } from '../../../components/global';
import { getPermissions, isArrayEmpty, notify } from '../../../utility';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';

function Library({ books, error }) {
  const [bookData, setBooks] = useState(books);
  const [deleting, setDeleting] = useState(false);
  const { role } = useCurrentUser();

  useOnError(error);

  const onDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/books/${id}`);
      const arr = bookData.filter((item) => item.id !== id);
      setBooks(arr);

      notify({
        type: 'success',
        message: 'Book deleted successfully'
      });
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
    <section className="section pt-0">
      <Head>
        <title>Library | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="d-flex justify-content-between pb-5">
          <h4>Library</h4>

          {getPermissions(role).includes('create.books') && (
            <Link href="/dashboard/library/create" passHref>
              <button className="button button--primary">Create book</button>
            </Link>
          )}
        </div>

        {isArrayEmpty(bookData) && (
          <Empty
            className="mt-5 color-black"
            icon="icon-book"
            desc="No books available"
          />
        )}

        {!isArrayEmpty(bookData) && (
          <div className="row">
            {bookData.map((item, i) => (
              <div className="col-md-4 mb-10" key={i}>
                <Book
                  item={item}
                  link={
                    getPermissions(role).includes('update.books')
                      ? `/dashboard/library/${item.slug}`
                      : null
                  }
                  onDelete={
                    getPermissions(role).includes('delete.books')
                      ? () => onDelete(item.id)
                      : null
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

Library.propTypes = {
  books: PropTypes.array,
  error: PropTypes.object
};

export default withAuth(Library);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let books = null;
  let error = {};

  try {
    const { data } = await axios.get('/books', config);
    books = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        books,
        error
      } // will be passed to the page component as props
    };
  }
}
