import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import axios from '../../services/axios';
import { Banner } from '../../components/app';
import { getImagePath } from '../../utility';
import styles from '../../styles/app/pages/news.module.scss';
import handleApiError from '../../services/handle-api-error';
import useOnError from '../../services/use-on-error';

export default function Article({ article, error }) {
  useOnError(error);

  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" hasBackButton />

      <div className="section container pb-0">
        <h2 className="text-center pb-8">{article?.title}</h2>

        <div className={styles.image}>
          {article && article.image && (
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
  article: PropTypes.object,
  error: PropTypes.object
};

export async function getServerSideProps({ params }) {
  let article = null;
  let error = {};

  try {
    const { slug } = params;
    const { data } = await axios.get(`/articles?slug=${slug}`);
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
