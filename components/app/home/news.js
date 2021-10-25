import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../../../styles/app/pages/home.module.scss';
import { Empty, NewsCard } from '../../global';
import { isArrayEmpty } from '../../../utility';

export default function News({ data }) {
  return (
    <section className={classnames('section section--lg', styles.news)}>
      <div className="container">
        <h2 className="color-primary text-center pb-5">Recent News</h2>
        {!isArrayEmpty(data) && (
          <div className="row justify-content-center">
            {data.slice(0, 3).map((item, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        )}

        {isArrayEmpty(data) && (
          <Empty icon="icon-news" className="color-primary" />
        )}

        {!isArrayEmpty(data) && (
          <div className="text-center mt-5">
            <Link href="/news" passHref>
              <button className="button button--primary">View More</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

News.propTypes = {
  data: PropTypes.array
};
