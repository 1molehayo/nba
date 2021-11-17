import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from '../../../services/axios';
import handleApiError from '../../../services/handle-api-error';
import useOnError from '../../../services/use-on-error';
import ArticleForm from '../../../components/dashboard/forms/news';
import withAuth from '../../../services/with-auth';
import { Loader } from '../../../components/global';
import { getPermissions, notify } from '../../../utility';
import { useCurrentUser } from '../../../contexts/current-user';
import useAuthGuard from '../../../services/use-auth-guard';

function Article({ article, error }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useAuthGuard('update.articles');

  useOnError(error);

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

      <ArticleForm
        data={article}
        onDelete={
          getPermissions(role).includes('delete.articles') ? handleDelete : null
        }
      />
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

  let article = {};
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
