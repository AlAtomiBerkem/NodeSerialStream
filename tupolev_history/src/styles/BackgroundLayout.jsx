import React from 'react';
import backgroundImage from '../assets/Frame 1.png';

const BackgroundLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
