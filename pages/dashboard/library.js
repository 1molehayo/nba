import React from 'react';
import Head from 'next/head';
import { Book } from '../../components/dashboard';
import { BOOKS } from '../../utility/constants';

export default function Library() {
  return (
    <section className="section pt-0">
      <Head>
        <title>Library | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <h4 className="pb-5">Library</h4>

        <div className="row">
          {BOOKS.map((item, i) => (
            <div className="col-md-4 mb-10" key={i}>
              <Book item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
