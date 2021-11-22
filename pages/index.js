import Head from 'next/head';
import About from '../components/app/home/about';
import Events from '../components/app/home/events';
import Hero from '../components/app/home/hero';
import News from '../components/app/home/news';
import Quote from '../components/app/home/quote';
import TwitterFeeds from '../components/app/home/twitter-feeds';
import { Loader } from '../components/global';
import useHomeAPIs from '../services/api-functions/app';
import useOnError from '../services/use-on-error';

export default function Home() {
  const { articles, error, events, loading } = useHomeAPIs();

  useOnError(error);

  if (loading) {
    return <Loader />;
  }

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

export async function getServerSideProps() {
  return {
    props: {
      hasOval: false
    } // will be passed to the page component as props
  };
}
