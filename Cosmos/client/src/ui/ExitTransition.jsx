import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const ExitTransition = ({ children, onExit }) => {
  const navigate = useNavigate();
  
  const [springs, api] = useSpring(() => ({
    scale: 1,        
    opacity: 1,        
    transform: 'translateY(0px) translateX(0px)',
    
    config: {
      tension: 510,
      friction: 5,
      duration: 2200
    }
  }));

  const handleExit = (path) => {
    api.start({

      scale: 3.3,
      // opacity: 0.95,
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