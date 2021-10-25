import React from 'react';
import ArticleForm from '../../../components/dashboard/forms/news';
import withAuth from '../../../services/with-auth';

function NewArticle() {
  return <ArticleForm />;
}

export default withAuth(NewArticle);
