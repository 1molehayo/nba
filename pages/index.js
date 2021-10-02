import Head from 'next/head';
import About from '../components/app/home/about';
import Events from '../components/app/home/events';
import Hero from '../components/app/home/hero';
import News from '../components/app/home/news';
import Quote from '../components/app/home/quote';
import TwitterFeeds from '../components/app/home/twitter-feeds';

export default function Home() {
  return (
    <section className="home">
      <Head>
        <title>Home | NBA-Ikeja</title>
      </Head>

      <Hero />

      <About />

      <Quote />

      <News />

      <Events />

      <TwitterFeeds />
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {
      hasOval: false
    } // will be passed to the page component as props
  };
}
