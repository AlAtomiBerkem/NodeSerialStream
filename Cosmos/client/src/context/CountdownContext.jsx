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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const startCountdown = () => {
    setIsCountdownActive(true);
    setUploadError(null);
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

  const startUploading = () => {
    setIsUploading(true);
    setUploadError(null);
  };

  const stopUploading = () => {
    setIsUploading(false);
  };

  const setResult = (result) => {
    setUploadResult(result);
  };

  const setError = (error) => {
    setUploadError(error);
  };

  const resetState = () => {
    setIsCountdownActive(false);
    setIsProcessing(false);
    setIsUploading(false);
    setUploadResult(null);
    setUploadError(null);
  };

  const value = {
    isCountdownActive,
    isProcessing,
    isUploading,
    uploadResult,
    uploadError,
    startCountdown,
    stopCountdown,
    startProcessing,
    stopProcessing,
    startUploading,
    stopUploading,
    setResult,
    setError,
    resetState
  };

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
}; 