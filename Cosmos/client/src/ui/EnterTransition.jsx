import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const EnterTransition = ({ children }) => {
  

  const [springs, api] = useSpring(() => ({
    scale: 2,
    // opacity: 0.95,
    transform: 'translateY(75px) translateX(10px)',
    
    config: {
      tension: 810,      // Натяжение пружины (влияет на скорость)
      friction: 1,      // Трение (влияет на плавность)
      duration: 1500     // Длительность анимации в миллисекундах
    }
  }));

  React.useEffect(() => {
    api.start({
      scale: 1,        
      opacity: 1,     
      transform: 'translateY(0px) translateX(0px)',
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