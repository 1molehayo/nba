import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import { Empty, Loader, NewsCard } from '../../../components/global';
import { getPermissions, isArrayEmpty, notify } from '../../../utility';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';

function News({ articles, error }) {
  const [articleData, setArticles] = useState(articles);
  const [deleting, setDeleting] = useState(false);
  const { role } = useCurrentUser();

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

  return (
    <section className="section pt-0">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="d-flex justify-content-between pb-5">
          <h4>News</h4>

          <Link href="/dashboard/news/create" passHref>
            <button className="button button--primary">Create news</button>
          </Link>
        </div>

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

        {isArrayEmpty(articleData) && (
          <Empty icon="icon-news" className="color-primary" />
        )}
      </div>
    </section>
  );
}

News.propTypes = {
  articles: PropTypes.array,
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
  let error = {};

  try {
    const { data } = await axios.get('/articles', config);
    articles = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        articles,
        error
      } // will be passed to the page component as props
    };
  }
}
