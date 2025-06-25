import React, { useRef } from 'react';
import '../../styles/Card.css';
import photo from '../../assets/ant-2.png';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePhoto } from '../../store/slices/photoSlice';
import radionBtn from '../../assets/buttons/radionBtn.png';
import radioBtnActive from '../../assets/buttons/radioBtnActive.png';
import cardTexts from '../../store/texts/cardTexts';
import '../../styles/CardTexts.css';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const activePhotoIndex = useSelector(
    (state) => state.photos.activePhotoIndex[card.id]
  );
  const photos = useSelector((state) => state.photos.photos[card.id]);
  const safeIndex = Math.max(0, Math.min(activePhotoIndex, photos.length - 1));
  const photoUrl =
    photos && photos[safeIndex] && photos[safeIndex].url
      ? photos[safeIndex].url
      : '';
  const prevPhotoIndex = useRef(activePhotoIndex);
  const [direction, setDirection] = React.useState(1);
  const text = cardTexts[card.id];

  React.useEffect(() => {
    if (activePhotoIndex > prevPhotoIndex.current) setDirection(1);
    else if (activePhotoIndex < prevPhotoIndex.current) setDirection(-1);
    prevPhotoIndex.current = activePhotoIndex;
  }, [activePhotoIndex]);

  const handleRadioClick = (idx) => {
    dispatch(setActivePhoto({ cardId: card.id, photoIndex: idx }));
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="card">
      <div className="card-photo">
        <div className="photo-placeholder">
          <div className="photo-phocus">
            <AnimatePresence mode="wait" custom={direction}>
              {photoUrl && (
                <motion.img
                  key={card.id + '-' + safeIndex}
                  className="photo-img"
                  src={photoUrl}
                  alt="Фото"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="photo_radio_buttons">
          {photos &&
            photos.map((_, idx) => (
              <button
                key={idx}
                className="photo-radio-btn-img"
                onClick={() => handleRadioClick(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 2,
                  cursor: 'pointer',
                }}
              >
                <img
                  src={activePhotoIndex === idx ? radioBtnActive : radionBtn}
                  alt={
                    activePhotoIndex === idx
                      ? 'Активная радиокнопка'
                      : 'Радиокнопка'
                  }
                />
              </button>
            ))}
        </div>
      </div>
      <div className="card-content">
        <h2 className="card-title">{text.title}</h2>
        <p className="card-desc">{text.description}</p>
      </div>
    </div>
  );
};

export default Card;
