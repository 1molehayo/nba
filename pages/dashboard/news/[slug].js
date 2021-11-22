import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { FETCHING } from '../../../utility/constants';
import useFetch from '../../../services/use-fetch';

function Article({ slug }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useAuthGuard('update.articles');

  const {
    data: article,
    error,
    status
  } = useFetch(`/articles?slug=${slug}`, true);

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

  if (deleting || status === FETCHING) {
    return <Loader />;
  }

  return (
    <>
      <ArticleForm
        data={article || null}
        onDelete={
          getPermissions(role).includes('delete.articles') ? handleDelete : null
        }
      />
    </>
  );
}

Article.propTypes = {
  slug: PropTypes.string
};

export default withAuth(Article);

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      slug
    }
  };
}
