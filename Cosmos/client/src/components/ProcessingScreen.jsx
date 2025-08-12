import React, { useState, useEffect, useRef } from 'react';

/**
 * ProcessingScreen - компонент для отображения экрана обработки
 * 
 * Показывает "ОБРАБОТКА" с анимированными точками
 * 
 * Параметры:
 * - isVisible: флаг для показа/скрытия экрана
 * - onComplete: функция, вызываемая после завершения обработки
 * - duration: длительность показа экрана (в мс)
 */
const ProcessingScreen = ({ isVisible = false, onComplete, duration = 3000 }) => {
  const [dots, setDots] = useState(0);
  const dotIntervalRef = useRef(null);
  const completeTimerRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущие таймеры
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

    // Анимация точек
    dotIntervalRef.current = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);

    // Таймер для завершения обработки
    completeTimerRef.current = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    // Очистка при размонтировании
    return () => {
      if (dotIntervalRef.current) {
        clearInterval(dotIntervalRef.current);
      }
      if (completeTimerRef.current) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, [isVisible]); // Убираем duration и onComplete из зависимостей

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
        
        {/* Анимированные точки */}
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