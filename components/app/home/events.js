import React from "react";
// import classnames from "classnames";
import Link from "next/link";
// import styles from "../../../styles/app/pages/home.module.scss";
import { EVENTS } from "../../../utility/constants";
import { EventsCard } from "../events-card";

export default function Events() {
  return (
    <section className="section section--lg">
      <div className="container">
        <h2 className="color-primary text-center pb-5">Upcoming Events</h2>

        <div className="row justify-content-center">
          {EVENTS.slice(0, 3).map((item, i) => (
            <div className="col-md-4 mb-5" key={i}>
              <EventsCard item={item} />
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
