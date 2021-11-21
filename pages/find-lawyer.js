import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Banner } from '../components/app';
import { LawyerCard } from '../components/app/lawyer-card';
import { Empty, Loader } from '../components/global';
import Pagination from '../components/global/pagination';
import { Searchbar } from '../components/global/searchbar';
import axios from '../services/axios';
import handleApiError from '../services/handle-api-error';
import useOnError from '../services/use-on-error';
import { getStartPage, isArrayEmpty } from '../utility';
import { PAGE_SIZE_ALT } from '../utility/constants';

export default function FindLawyer({ lawyers, lawyersCount, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lawyerData, setLawyers] = useState(lawyers);
  const [lawyersDataCount, setLawyersCount] = useState(lawyersCount);
  const [errorData, setError] = useState(error);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ _limit: PAGE_SIZE_ALT });

  useOnError(errorData);

  const handlePageChange = async (page) => {
    setLoading(true);

    try {
      const newQuery = {
        ...query,
        _start: getStartPage(page, PAGE_SIZE_ALT)
      };

      const { data } = await axios.get('/profiles', {
        params: newQuery
      });

      setLawyers(data);
      setCurrentPage(page);
      setQuery(newQuery);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const searchQuery = {
        '_where[_or][0][first_name_contains]': searchValue,
        '_where[_or][1][last_name_contains]': searchValue
      };

      const newQuery = {
        ...query,
        ...searchQuery
      };

      const { data } = await axios.get('/profiles', { params: newQuery });
      setLawyers(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/profiles/count', {
        params: searchQuery
      });
      setLawyersCount(countData);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    const { data } = await axios.get('/profiles', {
      params: { _limit: PAGE_SIZE_ALT, active: 1 }
    });

    setLawyers(data);
    setQuery({ _limit: PAGE_SIZE_ALT });

    const { data: countData } = await axios.get('/profiles/count');
    setLawyersCount(countData);
  };

  const onClear = async () => {
    setLoading(true);
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
    setLoading(false);
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
              className="mt-8 color-primary"
              icon="icon-profile"
              desc="No lawyers available"
            />
          )}

          <div className="relative">
            {loading && <Loader />}

            <div className="row">
              {lawyerData.map((item, i) => (
                <div className="col-md-6 col-lg-4 col-xl-3 mb-5" key={i}>
                  <LawyerCard item={item} />
                </div>
              ))}
            </div>

            {lawyersDataCount > PAGE_SIZE_ALT && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={lawyersDataCount}
                  pageSize={PAGE_SIZE_ALT}
                  onPageChange={(page) => handlePageChange(page)}
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
  lawyers: PropTypes.array,
  lawyersCount: PropTypes.number
};

export async function getServerSideProps() {
  let lawyers = [];
  let lawyersCount = 0;
  let error = {};

  try {
    const { data } = await axios.get('/profiles', {
      params: { _limit: PAGE_SIZE_ALT, active: 1 }
    });
    lawyers = data;

    const { data: countData } = await axios.get('/profiles/count', {
      params: { active: 1 }
    });

    lawyersCount = countData;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        lawyers,
        lawyersCount,
        error
      } // will be passed to the page component as props
    };
  }
}
