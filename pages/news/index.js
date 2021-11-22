import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Banner } from '../../components/app';
import { Empty, Loader, NewsCard, Searchbar } from '../../components/global';
import Pagination from '../../components/global/pagination';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import useOnError from '../../services/use-on-error';
import { getStartPage, isArrayEmpty } from '../../utility';
import { PAGE_SIZE_ALT } from '../../utility/constants';

const DEFAULT_QUERY = {
  _limit: PAGE_SIZE_ALT,
  _sort: 'created_at:DESC'
};
export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articleData, setArticles] = useState([]);
  const [errorData, setError] = useState();
  const [newsDataCount, setNewsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useOnError(errorData);

  const fetchArticles = useCallback(async () => {
    const { data } = await axios.get('/articles', { params: query });
    setArticles(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticlesCount = useCallback(async () => {
    const { data } = await axios.get('/articles/count');
    setNewsCount(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchArticles(), fetchArticlesCount()])
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
      const { data } = await axios.get('/articles', { params: newQuery });
      setArticles(data);
      setCurrentPage(page);
      setQuery(newQuery);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const searchQuery = { title_contains: searchValue };
      const newQuery = {
        ...query,
        ...searchQuery
      };

      const { data } = await axios.get('/articles', { params: newQuery });
      setArticles(data);
      setQuery(newQuery);

      const { data: countData } = await axios.get('/articles/count', {
        params: searchQuery
      });
      setNewsCount(countData);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    const { data } = await axios.get('/articles', {
      params: DEFAULT_QUERY
    });

    setArticles(data);
    setQuery(DEFAULT_QUERY);

    const { data: countData } = await axios.get('/articles/count');
    setNewsCount(countData);
  };

  const onClear = async () => {
    await resetData();
    setCurrentPage(1);
    setSearchValue('');
  };

  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <Banner title="News" />

      <div className="section pb-0">
        <div className="container">
          <Searchbar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClear={onClear}
            onSearch={handleSearch}
            placeholder="Search by title"
            className="searchbar--sm"
          />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="relative">
            {loading && <Loader inline />}

            {isArrayEmpty(articleData) && (
              <div className="mt-8">
                <Empty className="color-primary" icon="icon-news" />
              </div>
            )}

            {!isArrayEmpty(articleData) && (
              <div className="row">
                {articleData.map((item, i) => (
                  <div className="col-md-4 col-xl-3 mb-5" key={i}>
                    <NewsCard item={item} />
                  </div>
                ))}
              </div>
            )}

            {newsDataCount > PAGE_SIZE_ALT && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={newsDataCount}
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
