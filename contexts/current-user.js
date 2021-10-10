import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  LOGIN_START,
  LOGIN_COMPLETED,
  LOGOUT_START,
  LOGOUT_COMPLETED
} from '../utility/constants';
import axios from '../services/axios';

const ContextDefaultValues = {
  isAuthenticated: false,
  loading: false
};

const CurrentUserStateContext = createContext(ContextDefaultValues);
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, ...action.user, loading: true };
    case LOGIN_COMPLETED:
      return {
        ...state,
        ...action.user,
        loading: false,
        isAuthenticated: true
      };
    case LOGOUT_START:
      return { loading: true };
    case LOGOUT_COMPLETED:
      return { loading: false, isAuthenticated: false };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ContextDefaultValues);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: LOGIN_START });
      try {
        const { data } = await axios.get('/profiles/me');
        dispatch({ type: LOGIN_COMPLETED, user: data });
      } catch (err) {
        dispatch({ type: LOGOUT_COMPLETED });
      }
    };

    fetchUser();
  }, []);

  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider value={state}>
        {children}
      </CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

CurrentUserProvider.propTypes = {
  children: PropTypes.node
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () =>
  useContext(CurrentUserDispatchContext);
