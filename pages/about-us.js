import Head from "next/head";
import { Banner } from "../components/app";

export default function AboutUs() {
  return (
    <section className="about-us">
      <Head>
        <title>About | NBA-Ikeja</title>
      </Head>

      <Banner title="About Us" />

      <div className="section">
        <div className="container">
          <p>About Us page</p>
        </div>
      </div>
    </section>
  );
}
