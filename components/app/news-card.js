import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/app/components/news-card.module.scss";
import PropTypes from "prop-types";

export const NewsCard = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </div>

      <div className={styles.body}>
        <p className={styles.date}>{item.date}</p>
        <p className={styles.title}>{item.title}</p>
        <p className="font-size-small">{item.desc}</p>

        <Link href={`/news/${item.id}`}>
          <a className="button--link">
            Read more <span className="icon-right-arrow ml-5" />
          </a>
        </Link>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  item: PropTypes.object,
};
