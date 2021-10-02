import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useEventListener from '../services/useEventListener';

const ContextDefaultValues = {
  isLargeTab: false,
  isMobile: false,
  isTab: false,
  isMenuOpen: false,
  toggleMenu: () => null
};

export const AppContext = createContext(ContextDefaultValues);

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isLargeTab, setIsLargeTab] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  const updateWindowDimensions = () => {
    setIsLargeTab(window.innerWidth < 990);
    setIsTab(window.innerWidth < 768);
    setIsMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  useEventListener('resize', updateWindowDimensions);

  return (
    <AppContext.Provider
      value={{
        isLargeTab,
        isMenuOpen,
        isMobile,
        isTab,
        toggleMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node
};

export const useAppContext = () => {
  return useContext(AppContext);
};
