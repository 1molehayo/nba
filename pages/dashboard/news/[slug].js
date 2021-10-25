import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../services/axios';
import handleApiError from '../../../services/handle-api-error';
import useOnError from '../../../services/use-on-error';
import { parseCookies } from 'nookies';
import ArticleForm from '../../../components/dashboard/forms/news';
import { useRouter } from 'next/router';
import withAuth from '../../../services/with-auth';
import { Loader } from '../../../components/global';

function Article({ article, error }) {
  const [deleting, setDeleting] = useState(false);

  useOnError(error);

  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/articles/${article.id}`);

      notify({
        type: 'success',
        message: 'Article deleted successfully'
      });

      router.replace('/dashboard/news');
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

      <ArticleForm data={article} onDelete={handleDelete} />
    </>
  );
}

Article.propTypes = {
  article: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(Article);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let article = null;
  let error = {};

  try {
    const { slug } = ctx.params;
    const { data } = await axios.get(`/articles?slug=${slug}`, config);
    article = { ...data[0] };
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        article,
        error
      }
    };
  }
}
