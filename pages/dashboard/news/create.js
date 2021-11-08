import React from 'react';
import ArticleForm from '../../../components/dashboard/forms/news';
import withAuth from '../../../services/with-auth';
import useAuthGuard from '../../../services/use-auth-guard';

function NewArticle() {
  useAuthGuard('create.articles');

  return <ArticleForm />;
}

export default withAuth(NewArticle);
