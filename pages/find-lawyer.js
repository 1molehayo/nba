import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../components/app';
import { LawyerCard } from '../components/app/lawyer-card';
import { Empty } from '../components/global';
import Pagination from '../components/global/pagination';
import { Searchbar } from '../components/global/searchbar';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import useOnError from '../services/use-on-error';
import { isArrayEmpty } from '../utility';
import { PAGE_SIZE_ALT } from '../utility/constants';

export default function FindLawyer({ lawyers, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lawyerData, setLawyers] = useState(lawyers);
  const [searchValue, setSearchValue] = useState('');

  useOnError(error);

  const handleSearch = async () => {
    const arr = lawyers.filter(
      (item) =>
        item.first_name.includes(searchValue) ||
        item.last_name.includes(searchValue)
    );
    setLawyers(arr);
  };

  const onClear = () => {
    setLawyers(lawyers);
    setSearchValue('');
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
            onClear={onClear}
            onSearch={handleSearch}
            placeholder="Search by name"
          />
        </div>
      </div>

      <div className="section">
        <div className="container">
          {isArrayEmpty(lawyerData) && (
            <Empty
              className="mt-5 color-primary"
              icon="icon-profile"
              desc="No lawyers available"
            />
          )}

          <div className="relative">
            <div className="row">
              {lawyerData.map((item, i) => (
                <div className="col-md-6 col-lg-4 col-xl-3 mb-5" key={i}>
                  <LawyerCard item={item} />
                </div>
              ))}
            </div>

            {lawyerData.length > PAGE_SIZE_ALT && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={lawyerData.length}
                  pageSize={PAGE_SIZE_ALT}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

FindLawyer.propTypes = {
  error: PropTypes.object,
  lawyers: PropTypes.array
};

export async function getServerSideProps() {
  let lawyers = [];
  let error = {};

  try {
    const { data } = await axios.get('/profiles');
    lawyers = data.filter((item) => item.active);
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
