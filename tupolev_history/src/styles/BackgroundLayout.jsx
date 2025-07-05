import React from 'react';
import defaultBackground from '../assets/Frame 1.png';

const BackgroundLayout = ({ children, background }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${background || defaultBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundLayout;
