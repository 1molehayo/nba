/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { FETCHED, FETCHING, FETCH_ERROR } from '../utility/constants';
import axios from './axios';

const useFetch = (url, returnObj = false) => {
  const cache = useRef({});

  const initialState = {
    status: FETCHING,
    error: null,
    data: !returnObj ? [] : null
  };

  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case FETCHING:
        return { ...initialState, status: FETCHING };
      case FETCHED:
        return { ...initialState, status: FETCHED, data: action.payload };
      case FETCH_ERROR:
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return reducerState;
    }
  }, initialState);

  const fetchData = useCallback(async (cancelRequest) => {
    if (!url) {
      return;
    }

    try {
      dispatch({ type: FETCHING });

      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: FETCHED, payload: data });
      } else {
        const { data } = await axios.get(url);
        cache.current[url] = returnObj ? data[0] : data;

        if (cancelRequest) {
          return;
        }

        dispatch({ type: FETCHED, payload: returnObj ? data[0] : data });
      }
    } catch (error) {
      if (cancelRequest) {
        return;
      }

      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  }, []);

  useEffect(() => {
    let cancelRequest = false;

    fetchData(cancelRequest);

    return function cleanup() {
      cancelRequest = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useFetch;
