import Head from 'next/head';
import PropTypes from 'prop-types';
import { Banner } from '../../components/app';
import { Empty, NewsCard } from '../../components/global';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import useOnError from '../../services/use-on-error';
import { isArrayEmpty } from '../../utility';

export default function News({ articles, error }) {
  useOnError(error);

  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" />

      <div className="section container">
        {!isArrayEmpty(articles) && (
          <div className="row">
            {articles.map((item, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {isArrayEmpty(articles) && (
          <div className="mt-8">
            <Empty icon="icon-calendar" />
          </div>
        )}
      </div>
    </section>
  );
}

News.propTypes = {
  articles: PropTypes.array,
  error: PropTypes.object
};

export async function getServerSideProps() {
  let articles = null;
  let error = {};

  try {
    const articleResponse = await axios.get('/articles');
    articles = articleResponse.data;
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
