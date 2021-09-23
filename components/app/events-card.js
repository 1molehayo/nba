import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/app/components/events-card.module.scss";
import PropTypes from "prop-types";

export const EventsCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>
        <p className="font-size-small">{item.desc}</p>

        <div className="row mt-4 mb-4">
          <div className="col-6">
            <p>
              <strong>Date &amp; Time</strong>
            </p>
            <p className="font-size-small">
              {item.date}, {item.time}
            </p>
          </div>

          <div className="col-6">
            <p>
              <strong>Venue</strong>
            </p>

            <p className="font-size-small">{item.venue}</p>
          </div>
        </div>

        <Link href={`/events/${item.id}`} passHref>
          <button className="button button--primary">See details</button>
        </Link>
      </div>
    </div>
  );
};

EventsCard.propTypes = {
  item: PropTypes.object,
};
