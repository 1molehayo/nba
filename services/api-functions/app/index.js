import { useCallback, useEffect, useState } from 'react';
import axios from '../../axios';
import handleApiError from '../../handle-api-error';

const useHomeAPIs = () => {
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    const query = {
      _limit: 3,
      _sort: 'created_at:DESC'
    };
    const { data } = await axios.get('/events', { params: query });
    setArticles(data);
  }, []);

  const fetchEvents = useCallback(async () => {
    const query = {
      _limit: 3,
      _sort: 'created_at:DESC'
    };
    const { data } = await axios.get('/articles', { params: query });
    setEvents(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchArticles(), fetchEvents()])
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

  return {
    articles,
    error,
    events,
    loading
  };
};

export default useHomeAPIs;
