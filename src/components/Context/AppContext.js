import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [apiData, setApiData] = useState('');

  return (
    <AppContext.Provider value={{ apiData, setApiData }}>
      {children}
    </AppContext.Provider>
  );
};