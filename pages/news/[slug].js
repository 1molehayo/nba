import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Banner } from '../../components/app';
import { getImagePath } from '../../utility';
import styles from '../../styles/app/pages/news.module.scss';
import useOnError from '../../services/use-on-error';
import useFetch from '../../services/use-fetch';
import { FETCHING } from '../../utility/constants';
import { Loader } from '../../components/global';

export default function Article({ slug }) {
  const {
    data: article,
    error,
    status
  } = useFetch(`/articles?slug=${slug}`, true);

  useOnError(error);

  if (status === FETCHING) {
    return <Loader />;
  }

  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" hasBackButton />

      <div className="section container pb-0">
        <h2 className="text-center pb-8">{article?.title}</h2>

        <div className={styles.image}>
          {article && article?.image && (
            <Image
              src={getImagePath(article.image.url)}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
      </div>

      <div className="section container">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article?.content }}
        ></div>
      </div>
    </section>
  );
}

Article.propTypes = {
  slug: PropTypes.string
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      slug
    }
  };
}
