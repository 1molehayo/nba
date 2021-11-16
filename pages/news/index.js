import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../../components/app';
import { Empty, Loader, NewsCard } from '../../components/global';
import Pagination from '../../components/global/pagination';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import useOnError from '../../services/use-on-error';
import { getStartPage, isArrayEmpty, notify } from '../../utility';
import { PAGE_SIZE_ALT } from '../../utility/constants';

export default function News({ articles, articlesCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articleData, setArticles] = useState(articles);
  const [loading, setLoading] = useState(false);

  useOnError(error);

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
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" />

      <div className="section container">
        {isArrayEmpty(articleData) && (
          <div className="mt-8">
            <Empty className="color-primary" icon="icon-calendar" />
          </div>
        )}

        {!isArrayEmpty(articleData) && (
          <div className="row">
            {articleData.map((item, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          {loading && <Loader inline />}

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

export async function getServerSideProps() {
  let articles = null;
  let articlesCount = 0;
  let error = {};

  try {
    const articleResponse = await axios.get('/articles?_start=1&_limit=12');
    articles = articleResponse.data;
    const countResponse = await axios.get('/articles/count');
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
