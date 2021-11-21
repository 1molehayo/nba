import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import { Empty, Loader, NewsCard, Searchbar } from '../../../components/global';
import {
  getPermissions,
  getStartPage,
  isArrayEmpty,
  notify
} from '../../../utility';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';
import { PAGE_SIZE_ALT } from '../../../utility/constants';
import Pagination from '../../../components/global/pagination';
import useAuthGuard from '../../../services/use-auth-guard';

function News({ articles, articlesCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articleData, setArticles] = useState(articles);
  const [errorData, setError] = useState(error);
  const [newsDataCount, setNewsCount] = useState(articlesCount);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState({ _limit: PAGE_SIZE_ALT });
  const { role } = useCurrentUser();

  useAuthGuard('find.articles');

  useOnError(errorData);

  const resetData = async () => {
    const { data } = await axios.get('/articles', {
      params: { _limit: PAGE_SIZE_ALT }
    });

    setArticles(data);
    setQuery({ _limit: PAGE_SIZE_ALT });

    const { data: countData } = await axios.get('/articles/count');
    setNewsCount(countData);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/articles/${id}`);
      await resetData();

      notify({
        type: 'success',
        message: 'Article deleted successfully'
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

      const { data } = await axios.get('/articles', {
        params: newQuery
      });
      setArticles(data);
      setCurrentPage(page);
      setQuery(newQuery);
    } catch (err) {
      setError(handleApiError(err));
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

      const { data } = await axios.get('/articles', { params: newQuery });
      setArticles(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/articles/count', {
        params: searchQuery
      });
      setNewsCount(countData);
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
        <title>News | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="d-flex justify-content-between pb-5">
          <h4 className="mb-0">News</h4>

          <div className="d-flex align-items-center">
            <Searchbar
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={onClear}
              onSearch={handleSearch}
              placeholder="Search by title"
              className="searchbar--sm"
            />

            {getPermissions(role).includes('create.articles') && (
              <Link href="/dashboard/news/create" passHref>
                <button className="button button--primary ml-3">
                  Create news
                </button>
              </Link>
            )}
          </div>
        </div>

        {isArrayEmpty(articleData) && (
          <Empty icon="icon-news" className="mt-5 color-primary" />
        )}

        <div className="relative pt-5">
          {loading && <Loader inline />}

          {!isArrayEmpty(articleData) && (
            <div className="row">
              {articleData.map((item, i) => (
                <div className="col-md-6 col-xl-4 mb-5" key={i}>
                  <NewsCard
                    item={item}
                    link={
                      getPermissions(role).includes('update.articles')
                        ? `/dashboard/news/${item.slug}`
                        : null
                    }
                    onDelete={
                      getPermissions(role).includes('delete.articles')
                        ? () => handleDelete(item.id)
                        : null
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {newsDataCount > PAGE_SIZE_ALT && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={newsDataCount}
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

News.propTypes = {
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
  error: PropTypes.object
};

export default withAuth(News);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let articles = [];
  let articlesCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/articles', {
      ...config,
      params: {
        _limit: PAGE_SIZE_ALT
      }
    });
    articles = data;
    const { data: countData } = await axios.get('/articles/count', config);
    articlesCount = countData;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        articles,
        articlesCount,
        error
      } // will be passed to the page component as props
    };
  }
}
