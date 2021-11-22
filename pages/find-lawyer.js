import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
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

const DEFAULT_QUERY = {
  _limit: PAGE_SIZE_ALT,
  active: 1,
  _sort: 'first_name:ASC'
};
export default function FindLawyer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lawyerData, setLawyers] = useState([]);
  const [lawyersDataCount, setLawyersCount] = useState(0);
  const [errorData, setError] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useOnError(errorData);

  const fetchLawyers = useCallback(async () => {
    const { data } = await axios.get('/profiles', { params: query });
    setLawyers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLawyersCount = useCallback(async () => {
    const { data } = await axios.get('/profiles/count', {
      params: { active: 1 }
    });
    setLawyersCount(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchLawyers(), fetchLawyersCount()])
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(handleApiError(err));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        params: { ...searchQuery, active: 1 }
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
      params: DEFAULT_QUERY
    });

    setLawyers(data);
    setQuery(DEFAULT_QUERY);

    const { data: countData } = await axios.get('/profiles/count', {
      params: { active: 1 }
    });
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
