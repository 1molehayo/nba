import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useEventListener from '../services/use-event-listener';

const ContextDefaultValues = {
  isLargeTab: false,
  isMobile: false,
  isTab: false,
  isMenuOpen: false,
  toggleMenu: () => null,
  closeMenu: () => null
};

export const AppContext = createContext(ContextDefaultValues);

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isLargeTab, setIsLargeTab] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  const closeMenu = () => setMenuOpen(false);

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
        toggleMenu,
        closeMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node
};

export const useAppContext = () => useContext(AppContext);
