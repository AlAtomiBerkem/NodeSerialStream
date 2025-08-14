import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const EnterTransition = ({ children }) => {
  
  // Настройки анимации через react-spring
  const [springs, api] = useSpring(() => ({
    // Начальные значения анимации (реверсивные к ExitTransition)
    scale: 2,         // Масштаб: начинаем с увеличенного размера
    // opacity: 0.95,      // Прозрачность: начинаем с небольшой прозрачности
    transform: 'translateY(75px) translateX(10px)', // Позиция: начинаем с центра
    
    // Настройки плавности анимации
    config: {
      tension: 810,      // Натяжение пружины (влияет на скорость)
      friction: 1,      // Трение (влияет на плавность)
      duration: 1500     // Длительность анимации в миллисекундах
    }
  }));

  // Запускаем анимацию входа при монтировании компонента
  React.useEffect(() => {
    api.start({
      scale: 1,           // Уменьшаем до нормального размера
      opacity: 1,         // Делаем полностью видимым
      transform: 'translateY(0px) translateX(0px)', // Возвращаем в центр
    });
  }, [api]);

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
      {children}
    </animated.div>
  );
};

export default EnterTransition; 