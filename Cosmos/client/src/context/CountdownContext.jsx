import React, { createContext, useContext, useState } from 'react';

const CountdownContext = createContext();

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }
  return context;
};

export const CountdownProvider = ({ children }) => {
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const startCountdown = () => {
    setIsCountdownActive(true);
  };

  const stopCountdown = () => {
    setIsCountdownActive(false);
  };

  const value = {
    isCountdownActive,
    startCountdown,
    stopCountdown
  };

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
}; 