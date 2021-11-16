import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import * as qs from 'qs';
import { Book } from '../../../components/dashboard';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import withAuth from '../../../services/with-auth';
import { Empty, Loader, Searchbar } from '../../../components/global';
import {
  getPermissions,
  getStartPage,
  isArrayEmpty,
  notify
} from '../../../utility';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';
import Pagination from '../../../components/global/pagination';
import { PAGE_SIZE_ALT } from '../../../utility/constants';
import useAuthGuard from '../../../services/use-auth-guard';

function Library({ books, bookCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookData, setBooks] = useState(books);
  const [bookDataCount, setBookCount] = useState(bookCount);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { role } = useCurrentUser();

  useAuthGuard('find.books');

  useOnError(error);

  const handleDelete = async (id) => {
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

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const query = qs.stringify({
        _start: getStartPage(page),
        _limit: PAGE_SIZE_ALT
      });

      const { data } = await axios.get(`/books?${query}`);
      setBooks(data);
      setCurrentPage(page);
    } catch (err) {
      const errorObj = handleApiError(err);
      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const query = qs.stringify({
        _where: [{ title_contains: searchValue }],
        _start: 1,
        _limit: PAGE_SIZE_ALT
      });
      const { data } = await axios.get(`/books?${query}`);
      setBooks(data);

      const countQuery = qs.stringify({
        _where: [{ title_contains: searchValue }]
      });
      const countResponse = await axios.get(`/books/count?${countQuery}`);
      setBookCount(countResponse.data);
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    setBooks(books);
    setBookCount(bookCount);
    setCurrentPage(1);
    setSearchValue('');
  };

  return (
    <section className="section pt-0">
      <Head>
        <title>Library | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="header-title-block">
          <h4>Library</h4>

          <div className="d-flex align-items-center">
            <Searchbar
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={onClear}
              onSearch={handleSearch}
              placeholder="Search by name"
              className="searchbar--sm"
            />

            {getPermissions(role).includes('create.books') && (
              <Link href="/dashboard/library/create" passHref>
                <button className="button button--primary ml-3">
                  Create book
                </button>
              </Link>
            )}
          </div>
        </div>

        {isArrayEmpty(bookData) && (
          <Empty
            className="mt-5 color-primary"
            icon="icon-book"
            desc="No books available"
          />
        )}

        <div className="relative">
          {loading && <Loader inline />}

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
                        ? () => handleDelete(item.id)
                        : null
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {bookDataCount > PAGE_SIZE_ALT && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={bookDataCount}
                pageSize={PAGE_SIZE_ALT}
                onPageChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Library.propTypes = {
  books: PropTypes.array,
  bookCount: PropTypes.number,
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
  let bookCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/books?_start=1&_limit=12', config);
    books = data;
    const countResponse = await axios.get('/books/count', config);
    bookCount = countResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        books,
        bookCount,
        error
      } // will be passed to the page component as props
    };
  }
}
