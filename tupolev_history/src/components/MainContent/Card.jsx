import React, { useRef } from 'react';
import '../../styles/Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePhoto } from '../../store/slices/photoSlice';
import radionBtn from '../../assets/buttons/radionBtn.png';
import radioBtnActive from '../../assets/buttons/radioBtnActive.png';
import cardTexts from '../../store/texts/cardTexts';
import '../../styles/CardTexts.css';
import { motion, AnimatePresence } from 'framer-motion';
import { button } from 'framer-motion/client';

const Card = ({ card, onTouchStart, onTouchEnd }) => {
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
  const photoCaption =
    photos && photos[safeIndex] && photos[safeIndex].caption
      ? photos[safeIndex].caption
      : '';
  const prevPhotoIndex = useRef(activePhotoIndex);
  const [direction, setDirection] = React.useState(1);
  const text = cardTexts[card.id];

  const touchStartX = useRef(null);

  React.useEffect(() => {
    if (activePhotoIndex > prevPhotoIndex.current) setDirection(1);
    else if (activePhotoIndex < prevPhotoIndex.current) setDirection(-1);
    prevPhotoIndex.current = activePhotoIndex;
  }, [activePhotoIndex]);

  const handleRadioClick = (idx) => {
    dispatch(setActivePhoto({ cardId: card.id, photoIndex: idx }));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const numberPart = Array.isArray(text.title)
    ? text.title.find((part) => part.type === 'number')
    : null;
  const textParts = Array.isArray(text.title)
    ? text.title.filter((part) => part.type === 'main' || part.type === 'accent')
    : [];
  const hasAccent = Array.isArray(text.title) && text.title.some((part) => part.type === 'accent');

  return (
    <div className="card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="card-photo">
        <div className="photo-placeholder">
          <div
            className="photo-phocus"
            style={{position: 'relative'}}
            onTouchStart={handleTouchStart}
          >
            {photoCaption && (
              <div
                style={{
                  position: 'absolute',
                  top: 52,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#A1A1A1',
                  fontWeight: 400,
                  fontSize: 40,
                  zIndex: 2,
                  padding: '2px 16px',
                  borderRadius: 12,
                  pointerEvents: 'none',
                  maxWidth: '90%',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'Akrobat, Arial, sans-serif',
                }}
              >
                [{photoCaption}]
              </div>
            )}
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
        <div
          className="card-title"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            marginBottom: 10,
          
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                minWidth: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
            >
              {numberPart && (
                <span
                  style={{
                    color: '#fff',
                    fontSize: 109,
                    fontWeight: 700,
                    fontFamily: 'Akrobat, Arial, sans-serif',
                    lineHeight: '1',
                    letterSpacing: 2,
                  }}
                >
                  {numberPart.text}
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: 1,
                marginLeft: 20,
                minWidth: 0,
              }}
            >
              {textParts.map((part, idx) => (
                <span
                  key={idx}
                  style={{
                    color: '#72D8FF',
                    fontSize: 39,
                    fontWeight: 600,
                    fontFamily: 'Akrobat, Arial, sans-serif',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                    paddingBlockEnd: 8
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </div>
          
          {hasAccent && (
            <hr
              style={{
                width: '100%',
                border: 'none',
                borderTop: '2px solid #fff',
                margin: '30px 0 0 0',
                opacity: 0.7,
              }}
            />
          )}
        </div>
        <div className="card-desc">
          {Array.isArray(text.description) &&
            text.description.map((p, idx) => (
              <p
                key={idx}
                style={{
                  color: '#fffff',
                  fontWeight: 300,
                  fontSize: 32,
                  opacity: 0.9,
                  fontFamily: 'Akrobat',
                  marginBottom: idx < text.description.length - 1 ? 24 : 0,
                }}
              >
                {p.text}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
