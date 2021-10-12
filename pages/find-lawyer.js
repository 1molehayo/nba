import Head from 'next/head';
import { useState } from 'react';
import { Banner } from '../components/app';
import { LawyerCard } from '../components/app/lawyer-card';
import { Searchbar } from '../components/global/searchbar';
import { LAWYERS } from '../utility/constants';

export default function FindLawyer() {
  const [searchValue, setSearchValue] = useState();
  const handleSearch = async () => {
    // await api call
    // eslint-disable-next-line no-console
    console.log(`searched for ${searchValue}`);
  };

  return (
    <section className="find-lawyer">
      <Head>
        <title>Find Lawyer | NBA-Ikeja</title>
      </Head>

      <Banner title="Find Lawyer" />

      <div className="section pb-0">
        <div className="container">
          <Searchbar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            placeholder="Search using full name"
          />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            {LAWYERS.map((item, i) => (
              <div className="col-md-6 col-lg-4 col-xl-3 mb-5" key={i}>
                <LawyerCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
