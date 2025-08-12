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
  const [isProcessing, setIsProcessing] = useState(false);

  const startCountdown = () => {
    setIsCountdownActive(true);
  };

  const stopCountdown = () => {
    setIsCountdownActive(false);
  };

  const startProcessing = () => {
    setIsProcessing(true);
  };

  const stopProcessing = () => {
    setIsProcessing(false);
  };

  const value = {
    isCountdownActive,
    isProcessing,
    startCountdown,
    stopCountdown,
    startProcessing,
    stopProcessing
  };

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
}; 