import React, { useState, useEffect, useRef } from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import Card from './Card.jsx';
import '../../styles/MainContent.css';
import arrowLeft from '../../assets/arrow/arrow_left.png';
import arrowRight from '../../assets/arrow/arrow_right.png';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { setActivePhoto } from '../../store/slices/photoSlice';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
};

const MainContent = () => {
  const dispatch = useDispatch();
  const currentSection = useSelector((state) => state.section.currentSection);
  const cards = useSelector((state) => state.cards.cards[currentSection] || []);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0 && activeCardIndex < cards.length - 1) {
        setDirection(1);
        setActiveCardIndex(activeCardIndex + 1);
      } else if (delta > 0 && activeCardIndex > 0) {
        setDirection(-1);
        setActiveCardIndex(activeCardIndex - 1);
      }
    }
  };

  useEffect(() => {
    setActiveCardIndex(0);
  }, [currentSection]);

  const currentCard = cards.length > 0 && activeCardIndex < cards.length ? cards[activeCardIndex] : null;

  useEffect(() => {
    if (currentCard) {
      dispatch(setActivePhoto({ cardId: currentCard.id, photoIndex: 0 }));
    }
  }, [activeCardIndex, cards, dispatch, currentCard]);

  const handlePrevCard = () => {
    if (activeCardIndex > 0) {
      setDirection(-1);
      setActiveCardIndex(activeCardIndex - 1);
    }
  };
  const handleNextCard = () => {
    if (activeCardIndex < cards.length - 1) {
      setDirection(1);
      setActiveCardIndex(activeCardIndex + 1);
    }
  };

  return (
    <div className="main-content-wrapper">
      <div className="main-container">
        {cards.length > 0 && activeCardIndex > 0 && (
          <button className="card-arrow left" onClick={handlePrevCard}>
            <img src={arrowLeft} alt="Назад" />
          </button>
        )}
        <AnimatePresence mode="wait" custom={direction}>
          {cards.length > 0 && cards[activeCardIndex] ? (
            <motion.div
              key={cards[activeCardIndex]?.id || 'empty'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <Card
                card={cards[activeCardIndex]}
                direction={direction}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            </motion.div>
          ) : (
            <div style={{ color: '#fff', textAlign: 'center', width: '100%' }}>
              Нет карточек в этом разделе
            </div>
          )}
        </AnimatePresence>
        {cards.length > 0 && activeCardIndex < cards.length - 1 && (
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
