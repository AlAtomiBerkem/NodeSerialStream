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
  const cards = useSelector((state) => state.cards.cards);
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
    if (cards.length > 0) {
      const cardId = cards[activeCardIndex].id;
      dispatch(setActivePhoto({ cardId, photoIndex: 0 }));
    }
  }, [activeCardIndex, cards, dispatch]);

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
        {activeCardIndex > 0 && (
          <button className="card-arrow left" onClick={handlePrevCard}>
            <img src={arrowLeft} alt="Назад" />
          </button>
        )}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={cards[activeCardIndex].id}
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
        </AnimatePresence>
        {activeCardIndex < cards.length - 1 && (
          <button className="card-arrow right" onClick={handleNextCard}>
            <img src={arrowRight} alt="Вперёд" />
          </button>
        )}
      </div>
      <ButtonGroup  />
    </div>
  );
};

export default MainContent;
