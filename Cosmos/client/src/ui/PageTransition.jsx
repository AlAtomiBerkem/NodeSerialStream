import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate, useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState(null);

  const [springs, api] = useSpring(() => ({
    scale: 1,
    opacity: 1,
    transform: 'translateY(0px) translateX(0px)',
    config: {
      tension: 50,
      friction: 20,
      duration: 4500
    }
  }));

  const startTransition = (path) => {
    setIsTransitioning(true);
    setTargetPath(path);
    
    api.start({
      scale: 4.5,
      opacity: 1,
      transform: 'translateY(-200px) translateX(100px)',
      onRest: () => {
        navigate(path);
        setTimeout(() => {
          api.start({
            scale: 1,
            opacity: 1,
            transform: 'translateY(0px) translateX(0px)'
          });
          setIsTransitioning(false);
        }, 100);
      }
    });
  };

  React.useImperativeHandle(React.useRef(), () => ({
    startTransition
  }));

  return (
    <animated.div
      style={{
        ...springs,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: 'center 33%',
        zIndex: isTransitioning ? 20 : 1
      }}
    >
      {children}
    </animated.div>
  );
};

export default PageTransition; 