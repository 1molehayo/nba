import { useCallback, useEffect, useState } from 'react';
import axios from '../../axios';
import handleApiError from '../../handle-api-error';

const useDashboardAPIs = () => {
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [paymentsMade, setPaymentsMade] = useState(0);

  const fetchBooks = useCallback(async () => {
    const query = {
      _limit: 3,
      _sort: 'created_at:DESC'
    };
    const { data } = await axios.get('/books', { params: query });
    setBooks(data);
  }, []);

  const fetchBooksCount = useCallback(async () => {
    const { data } = await axios.get('/books/count');
    setBooksCount(data);
  }, []);

  const fetchMeetings = useCallback(async () => {
    const query = {
      date_gte: new Date().toISOString(),
      _limit: 3,
      _sort: 'date:DESC'
    };
    const { data } = await axios.get('/meetings', { params: query });
    setMeetings(data);
  }, []);

  const fetchMeetingsCount = useCallback(async () => {
    const query = {
      date_gte: new Date().toISOString()
    };
    const { data } = await axios.get('/meetings/count', { params: query });
    setMeetingsCount(data);
  }, []);

  const fetchPayments = useCallback(async () => {
    const query = {
      _limit: 5,
      _sort: 'updated_at:DESC'
    };
    const { data } = await axios.get('/payments/me', { params: query });
    setPayments(data);
  }, []);

  const fetchPaymentsMade = useCallback(async () => {
    const query = {
      status: 'successful'
    };
    const { data } = await axios.get('/payments/count', { params: query });
    setPaymentsMade(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([
      fetchBooks(),
      fetchBooksCount(),
      fetchMeetings(),
      fetchMeetingsCount(),
      fetchPayments(),
      fetchPaymentsMade()
    ])
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
    books,
    booksCount,
    error,
    loading,
    meetings,
    meetingsCount,
    payments,
    paymentsMade
  };
};

export default useDashboardAPIs;
