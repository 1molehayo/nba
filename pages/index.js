import Head from 'next/head';
import PropTypes from 'prop-types';
import About from '../components/app/home/about';
import Events from '../components/app/home/events';
import Hero from '../components/app/home/hero';
import News from '../components/app/home/news';
import Quote from '../components/app/home/quote';
import TwitterFeeds from '../components/app/home/twitter-feeds';
import axios from '../services/axios';
import handleApiError from '../services/handleApiError';

export default function Home({ articles, events }) {
  return (
    <section className="home">
      <Head>
        <title>Home | NBA-Ikeja</title>
      </Head>

      <Hero />

      <About />

      <Quote />

      <News data={articles} />

      <Events data={events} />

      <TwitterFeeds />
    </section>
  );
}

Home.propTypes = {
  articles: PropTypes.array,
  error: PropTypes.object,
  events: PropTypes.array
};

export async function getStaticProps() {
  let events = null;
  let articles = null;
  // let slides = null;
  let error = null;

  try {
    const eventResponse = await axios.get('/events');
    const articleResponse = await axios.get('/articles');
    events = eventResponse.data;
    articles = articleResponse.data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return {
      props: {
        articles,
        error,
        events,
        hasOval: false
        // slides
      } // will be passed to the page component as props
    };
  }
}
