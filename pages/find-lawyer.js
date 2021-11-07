import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../components/app';
import { LawyerCard } from '../components/app/lawyer-card';
import { Searchbar } from '../components/global/searchbar';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import useOnError from '../services/use-on-error';

export default function FindLawyer({ lawyers, error }) {
  const [searchValue, setSearchValue] = useState();
  useOnError(error);

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
            {lawyers.map((item, i) => (
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

FindLawyer.propTypes = {
  lawyers: PropTypes.array,
  error: PropTypes.object
};

export async function getServerSideProps() {
  let lawyers = null;
  let error = {};

  try {
    const { data } = await axios.get('/profiles');
    // lawyers = data.filter((item) => item.active);
    lawyers = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        lawyers,
        error
      } // will be passed to the page component as props
    };
  }
}
