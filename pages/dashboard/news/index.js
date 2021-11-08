import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import { Empty, Loader, NewsCard } from '../../../components/global';
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
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role } = useCurrentUser();

  useAuthGuard('find.articles');

  useOnError(error);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/articles/${id}`);
      const arr = articleData.filter((item) => item.id !== id);
      setArticles(arr);

      notify({
        type: 'success',
        message: 'Article deleted successfully'
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
      const { data } = await axios.get(
        `/articles?_start=${getStartPage(page)}&_limit=${PAGE_SIZE_ALT}`
      );
      setArticles(data);
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

  return (
    <section className="section pt-0">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="d-flex justify-content-between pb-5">
          <h4>News</h4>

          {getPermissions(role).includes('create.articles') && (
            <Link href="/dashboard/news/create" passHref>
              <button className="button button--primary">Create news</button>
            </Link>
          )}
        </div>

        {isArrayEmpty(articleData) && (
          <Empty icon="icon-news" className="color-primary" />
        )}

        <div className="relative">
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

          {articlesCount > PAGE_SIZE_ALT && (
            <div className="section pb-0">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={articlesCount}
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

  let articles = null;
  let articlesCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/articles?_start=1&_limit=12', config);
    articles = data;
    const countResponse = await axios.get('/articles/count', config);
    articlesCount = countResponse.data;
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
