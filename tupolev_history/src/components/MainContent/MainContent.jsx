import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import Card from './Card.jsx';
import '../../styles/MainContent.css';
import arrowLeft from '../../assets/arrow/arrow_left.png';
import arrowRight from '../../assets/arrow/arrow_right.png';
import { useSelector } from 'react-redux';

const MainContent = () => {
  const cards = useSelector(state => state.cards.cards);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };
  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="main-content-wrapper">
      <div className="main-container">
        <button className="card-arrow left" onClick={handlePrevCard}>
          <img src={arrowLeft} alt="Назад" />
        </button>
        <Card card={cards[activeCardIndex]} />
        <button className="card-arrow right" onClick={handleNextCard}>
          <img src={arrowRight} alt="Вперёд" />
        </button>
      </div>
      <ButtonGroup />
    </div>
  );
};

export default MainContent;
