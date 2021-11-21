import { useCallback, useEffect, useReducer, useRef } from 'react';
import { FETCHED, FETCHING, FETCH_ERROR } from '../utility/constants';
import axios from './axios';

const useFetch = (url) => {
  const cache = useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: []
  };

  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case FETCHING:
        return { ...initialState, status: 'fetching' };
      case FETCHED:
        return { ...initialState, status: 'fetched', data: action.payload };
      case FETCH_ERROR:
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return reducerState;
    }
  }, initialState);

  const fetchData = useCallback(
    async (cancelRequest) => {
      if (!url) {
        return;
      }

      try {
        dispatch({ type: FETCHING });

        if (cache.current[url]) {
          const data = cache.current[url];
          dispatch({ type: FETCHED, payload: data });
        } else {
          const response = await axios.get(url);
          const data = await response.json();
          cache.current[url] = data.data;

          if (cancelRequest) {
            return;
          }

          dispatch({ type: FETCHED, payload: data.data });
        }
      } catch (error) {
        if (cancelRequest) {
          return;
        }
        dispatch({ type: FETCH_ERROR, payload: error.message });
      }
    },
    [url]
  );

  useEffect(() => {
    let cancelRequest = false;

    fetchData(cancelRequest);

    return function cleanup() {
      cancelRequest = true;
    };
  }, [fetchData]);

  return state;
};

export default useFetch;
