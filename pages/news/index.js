import Head from 'next/head';
import PropTypes from 'prop-types';
import { Banner } from '../../components/app';
import { NewsCard } from '../../components/app/news-card';
import { Empty } from '../../components/global/empty';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import { isArrayEmpty } from '../../utility';

export default function News({ articles }) {
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
  articles: PropTypes.array
};

export async function getStaticProps() {
  let articles = null;
  let error = null;

  try {
    const articleResponse = await axios.get('/articles');
    articles = articleResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return {
      props: {
        articles,
        error
      } // will be passed to the page component as props
    };
  }
}
