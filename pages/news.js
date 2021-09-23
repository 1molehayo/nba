import Head from "next/head";
import { Banner } from "../components/app";
import { NewsCard } from "../components/app/news-card";
import { NEWS } from "../utility/constants";

export default function News() {
  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" />

      <div className="section container">
        <div className="row">
          {NEWS.map((item, i) => (
            <div className="col-md-4 mb-5" key={i}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
