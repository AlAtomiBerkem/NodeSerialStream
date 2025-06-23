import React from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import Card from './Card.jsx';
import '../../styles/MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content-wrapper">
      <div className="main-container">
        <Card />
      </div>
      <ButtonGroup />
    </div>
  );
};

export default MainContent;
