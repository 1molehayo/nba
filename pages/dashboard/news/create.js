import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../../components/dashboard/forms/news';
import withAuth from '../../../services/with-auth';
import { getPermissions } from '../../../utility';
import { useCurrentUser } from '../../../contexts/current-user';

function NewArticle() {
  const router = useRouter();
  const { role } = useCurrentUser();

  useEffect(() => {
    if (!getPermissions(role).includes('create.articles')) {
      router.replace('/dashboard/news');
    }
  }, [role, router]);

  return <ArticleForm />;
}

export default withAuth(NewArticle);
