import Head from "next/head";
import { Banner, EventsCard } from "../components/app";
import { EVENTS } from "../utility/constants";

export default function Events() {
  return (
    <section className="events">
      <Head>
        <title>Events | NBA-Ikeja</title>
      </Head>

      <Banner title="Events" />

      <div className="section container">
        <div className="row">
          {EVENTS.map((item, i) => (
            <div className="col-md-4 mb-5" key={i}>
              <EventsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
