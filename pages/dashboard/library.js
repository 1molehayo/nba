import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Book } from '../../components/dashboard';
import useOnError from '../../services/use-on-error';
import withAuth from '../../services/with-auth';
import { parseCookies } from 'nookies';
import { Empty } from '../../components/global';
import { isArrayEmpty } from '../../utility';

function Library({ books, error }) {
  useOnError(error);

  return (
    <section className="section pt-0">
      <Head>
        <title>Library | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <h4 className="pb-5">Library</h4>

        {isArrayEmpty(books) && (
          <Empty
            className="mt-5 color-black"
            icon="icon-book"
            desc="No books available"
          />
        )}

        <div className="row">
          {books &&
            books.map((item, i) => (
              <div className="col-md-4 mb-10" key={i}>
                <Book item={item} />
              </div>
            ))}
        </div>
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
    dues = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return {
      props: {
        books,
        error
      } // will be passed to the page component as props
    };
  }
}
