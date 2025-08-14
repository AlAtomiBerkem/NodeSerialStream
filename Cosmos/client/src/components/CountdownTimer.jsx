import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ isActive = false, onComplete, duration = 500 }) => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const countdownRef = useRef(null);

  useEffect(() => {

    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
      countdownRef.current = null;
    }

    if (!isActive) {
      setCurrentNumber(null);
      setIsVisible(false);
      return;
    }


    setCurrentNumber(3);
    setIsVisible(true);

    const countdown = async () => {

      await new Promise(resolve => {
        countdownRef.current = setTimeout(resolve, duration);
      });
      

      setCurrentNumber(2);
      await new Promise(resolve => {
        countdownRef.current = setTimeout(resolve, duration);
      });
      
      setCurrentNumber(1);
      await new Promise(resolve => {
        countdownRef.current = setTimeout(resolve, duration);
      });
      
      setIsVisible(false);
      setCurrentNumber(null);
      countdownRef.current = null;
      
      if (onComplete) {
        onComplete();
      }
    };

    countdown();

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [isActive]);

  if (!isVisible || !currentNumber) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="relative">
        <img 
          src={`/countdown/${currentNumber}.png`}
          alt={`${currentNumber}`}
          className="w-32 h-32 object-contain countdown-number countdown-glow"
        />
      </div>
    </div>
  );
};

export default CountdownTimer; 