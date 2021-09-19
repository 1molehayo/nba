import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useEventListener from "../services/useEventListener";

const ContextDefaultValues = {
  isLargeTab: false,
  isMobile: false,
  isTab: false,
};

export const AppContext = createContext(ContextDefaultValues);

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isLargeTab, setIsLargeTab] = useState(false);

  const updateWindowDimensions = () => {
    setIsLargeTab(window.screen.width < 990);
    setIsTab(window.screen.width < 768);
    setIsMobile(window.screen.width < 600);
  };

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  useEventListener("resize", updateWindowDimensions);

  return (
    <AppContext.Provider
      value={{
        isLargeTab,
        isMobile,
        isTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppContext = () => {
  return useContext(AppContext);
};
