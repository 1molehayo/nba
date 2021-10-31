import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { PLATFORM_START, PLATFORM_COMPLETED } from '../utility/constants';
import axios from '../services/axios';
import { capitalizeFirstLetter, notify } from '../utility';
import handleApiError from '../services/handle-api-error';
import { useCurrentUser } from './current-user';

const ContextDefaultValues = {
  loading: true,
  platforms: null
};

const CurrentPlatformStateContext = createContext(ContextDefaultValues);
const CurrentPlatformDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case PLATFORM_START:
      return { ...state, loading: true };
    case PLATFORM_COMPLETED:
      return {
        ...state,
        platforms: action.platforms,
        loading: false
      };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentPlatformProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ContextDefaultValues);
  const { isAuthenticated } = useCurrentUser();

  useEffect(() => {
    const fetchPlatform = async () => {
      dispatch({ type: PLATFORM_START });

      try {
        const { data } = await axios.get('/platforms');
        dispatch({ type: PLATFORM_COMPLETED, platforms: data });
      } catch (err) {
        const error = handleApiError(err);
        const { statusCode, message } = error;

        if (isAuthenticated) {
          notify({
            type: 'error',
            message:
              statusCode === 500
                ? capitalizeFirstLetter(message)
                : 'Problem fetching meeting platforms'
          });
        }
      } finally {
        dispatch({ type: PLATFORM_COMPLETED, platforms: null });
      }

      return () => {};
    };

    fetchPlatform();
  }, [isAuthenticated]);

  return (
    <CurrentPlatformDispatchContext.Provider value={dispatch}>
      <CurrentPlatformStateContext.Provider value={state}>
        {children}
      </CurrentPlatformStateContext.Provider>
    </CurrentPlatformDispatchContext.Provider>
  );
};

CurrentPlatformProvider.propTypes = {
  children: PropTypes.node
};

export const useCurrentPlatform = () => useContext(CurrentPlatformStateContext);
export const useDispatchPlatform = () =>
  useContext(CurrentPlatformDispatchContext);
