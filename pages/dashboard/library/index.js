import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

function Library() {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorData, setError] = useState();
  const [bookData, setBooks] = useState([]);
  const [bookDataCount, setBookCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState({
    _limit: PAGE_SIZE_ALT,
    _sort: 'created_at:DESC'
  });
  const { role } = useCurrentUser();

  useAuthGuard('find.books');

  useOnError(errorData);

  const fetchBooks = useCallback(async () => {
    const { data } = await axios.get('/books', { params: query });
    setBooks(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooksCount = useCallback(async () => {
    const { data } = await axios.get('/books/count');
    setBookCount(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchBooks(), fetchBooksCount()])
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(handleApiError(err));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetData = async () => {
    const { data } = await axios.get('/books', {
      params: { _limit: PAGE_SIZE_ALT }
    });

    setBooks(data);
    setQuery({ _limit: PAGE_SIZE_ALT });

    const { data: countData } = await axios.get('/books/count');
    setBookCount(countData);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/books/${id}`);
      await resetData();

      notify({
        type: 'success',
        message: 'Book deleted successfully'
      });
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDeleting(false);
    }
  };

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const newQuery = {
        ...query,
        _start: getStartPage(page, PAGE_SIZE_ALT)
      };

      const { data } = await axios.get('/books', { params: newQuery });

      setBooks(data);
      setCurrentPage(page);
      setQuery(newQuery);
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
      const searchQuery = { title_contains: searchValue };

      const newQuery = {
        ...query,
        ...searchQuery
      };

      const { data } = await axios.get('/books', { params: newQuery });
      setBooks(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/books/count', {
        params: searchQuery
      });
      setBookCount(countData);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const onClear = async () => {
    setLoading(true);
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
    setLoading(false);
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

        <div className="relative pt-5">
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

export default withAuth(Library);
