import React, { useState, useEffect, useRef } from 'react';

const ProcessingScreen = ({ isVisible = false, onComplete, duration = 500 }) => {
  const [dots, setDots] = useState(0);
  const dotIntervalRef = useRef(null);
  const completeTimerRef = useRef(null);

  useEffect(() => {
    if (dotIntervalRef.current) {
      clearInterval(dotIntervalRef.current);
      dotIntervalRef.current = null;
    }
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }

    if (!isVisible) {
      setDots(0);
      return;
    }

    dotIntervalRef.current = setInterval(() => {
      setDots(prev => (prev + 1) % 3);
    }, 400);

    // Таймер для завершения обработки
    completeTimerRef.current = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      if (dotIntervalRef.current) {
        clearInterval(dotIntervalRef.current);
      }
      if (completeTimerRef.current) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="relative text-center">
        <img 
          src="/countdown/processing.png"
          alt="Обработка"
          className="w-64 h-32 object-contain"
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${
                index < dots ? 'opacity-100' : 'opacity-30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen; 