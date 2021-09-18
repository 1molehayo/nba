import Head from "next/head";

export default function Home() {
  return (
    <div className="home">
      <Head>
        <title>Home | NBA-Ikeja</title>
        <meta
          name="description"
          content="National Bar Association, Ikeja chapter"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h2>Home page</h2>
      </div>
    </div>
  );
}
