import React, { useState, useEffect } from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import Card from './Card.jsx';
import '../../styles/MainContent.css';
import arrowLeft from '../../assets/arrow/arrow_left.png';
import arrowRight from '../../assets/arrow/arrow_right.png';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { setActivePhoto } from '../../store/slices/photoSlice';

const MainContent = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // touch swipe state для карточек
  const touchStartX = React.useRef(null);
  const touchEndX = React.useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0 && activeCardIndex < cards.length - 1) {
        setActiveCardIndex(activeCardIndex + 1);
      } else if (delta > 0 && activeCardIndex > 0) {
        setActiveCardIndex(activeCardIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      const cardId = cards[activeCardIndex].id;
      dispatch(setActivePhoto({ cardId, photoIndex: 0 }));
    }
  }, [activeCardIndex, cards, dispatch]);

  const handlePrevCard = () => {
    if (activeCardIndex > 0) setActiveCardIndex(activeCardIndex - 1);
  };
  const handleNextCard = () => {
    if (activeCardIndex < cards.length - 1)
      setActiveCardIndex(activeCardIndex + 1);
  };

  return (
    <div className="main-content-wrapper">
      <div className="main-container">
        {activeCardIndex > 0 && (
          <button className="card-arrow left" onClick={handlePrevCard}>
            <img src={arrowLeft} alt="Назад" />
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[activeCardIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%' }}
          >
            <Card
              card={cards[activeCardIndex]}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </motion.div>
        </AnimatePresence>
        {activeCardIndex < cards.length - 1 && (
          <button className="card-arrow right" onClick={handleNextCard}>
            <img src={arrowRight} alt="Вперёд" />
          </button>
        )}
      </div>
      <ButtonGroup />
    </div>
  );
};

export default MainContent;
