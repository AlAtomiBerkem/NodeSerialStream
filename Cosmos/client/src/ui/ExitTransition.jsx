import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const ExitTransition = ({ children, onExit }) => {
  const navigate = useNavigate();
  
  // Настройки анимации через react-spring
  const [springs, api] = useSpring(() => ({
    // Начальные значения анимации
    scale: 1,           // Масштаб: 1 = нормальный размер
    opacity: 1,          // Прозрачность: 1 = полностью видимый
    transform: 'translateY(0px) translateX(0px)', // Позиция: центр экрана
    
    // Настройки плавности анимации
    config: {
      tension: 510,      // Натяжение пружины (влияет на скорость)
      friction: 5,      // Трение (влияет на плавность)
      duration: 2200     // Длительность анимации в миллисекундах
    }
  }));

  /**
   * handleExit - функция для запуска анимации выхода
   * @param {string} path - путь для перехода (например, '/second')
   */
  const handleExit = (path) => {
    api.start({

      scale: 3.3,
      opacity: 0.95,
      transform: 'translateY(47px) translateX(435px)',
      onRest: () => {
        navigate(path);
      }
    });
  };

  return (
    <animated.div
      style={{
        ...springs,                
        position: 'absolute',          
        top: 0,                       
        left: 0,                     
        width: '100%',              
        height: '100%',              
        transformOrigin: 'center 25%' 
      }}
    >

      {React.cloneElement(children, { onExit: handleExit })}
    </animated.div>
  );
};

export default ExitTransition; 