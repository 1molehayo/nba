import React from "react";
import classnames from "classnames";
import Link from "next/link";
import styles from "../../../styles/app/pages/home.module.scss";
import { NEWS } from "../../../utility/constants";
import { NewsCard } from "../news-card";

export default function News() {
  return (
    <section className={classnames("section section--lg", styles.news)}>
      <div className="container">
        <h2 className="color-primary text-center pb-5">Recent News</h2>

        <div className="row justify-content-center">
          {NEWS.slice(0, 3).map((item, i) => (
            <div className="col-md-4 mb-5" key={i}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/news" passHref>
            <button className="button button--primary">View More</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
