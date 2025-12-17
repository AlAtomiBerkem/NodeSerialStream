import React, { useRef } from 'react';
import '../../styles/Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePhoto } from '../../store/slices/photoSlice';
import radionBtn from '../../assets/buttons/radionBtn.png';
import radioBtnActive from '../../assets/buttons/radioBtnActive.png';
import { BtnPhotoLeftSVg } from '../../shared/ui/BtnPhotoLeft/BtnPhotoLeft.jsx';
import { BtnPhotoRightSVg } from '../../shared/ui/BtnPhotoRight/BtnPhotoRight.jsx';
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
  const totalPhotos = Array.isArray(photos) ? photos.length : 0;
  const safeIndex = Math.max(0, Math.min(activePhotoIndex, totalPhotos - 1));
  const photoUrl =
    photos && photos[safeIndex] && photos[safeIndex].url
      ? photos[safeIndex].url
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

  const handlePrevPhoto = () => {
    if (safeIndex > 0) {
      dispatch(setActivePhoto({ cardId: card.id, photoIndex: safeIndex - 1 }));
    }
  };

  const handleNextPhoto = () => {
    if (safeIndex < totalPhotos - 1) {
      dispatch(setActivePhoto({ cardId: card.id, photoIndex: safeIndex + 1 }));
    }
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
          {photos && totalPhotos > 0 && (() => {
            const maxVisible = 6;

            if (totalPhotos > maxVisible) {
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 550,
                    marginTop: 8,
                  }}
                >
                  <button
                    onClick={handlePrevPhoto}
                    disabled={safeIndex === 0}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    <BtnPhotoLeftSVg active={safeIndex !== 0} />
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 8,
                      fontFamily: 'Akrobat, Arial, sans-serif',
                      lineHeight: 1,
                      letterSpacing: 0,
                    }}
                  >
                    <span
                      style={{
                        color: '#72D8FF',
                        fontSize: 48,
                        fontWeight: 700,
                        fontStyle: 'normal',
                      }}
                    >
                      {safeIndex + 1}
                    </span>
                    <span
                      style={{
                        color: '#A1A1A1',
                        fontSize: 48,
                        fontWeight: 600,
                        fontStyle: 'normal',
                      }}
                    >
                      /{totalPhotos}
                    </span>
                  </div>

                  <button
                    onClick={handleNextPhoto}
                    disabled={safeIndex >= totalPhotos - 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    <BtnPhotoRightSVg active={safeIndex < totalPhotos - 1} />
                  </button>
                </div>
              );
            }

            const half = Math.floor(maxVisible / 2);
            const start = Math.min(
              Math.max(0, safeIndex - half),
              Math.max(0, totalPhotos - maxVisible)
            );
            const end = Math.min(totalPhotos, start + maxVisible);

            return photos.slice(start, end).map((_, localIdx) => {
              const realIdx = start + localIdx;
              return (
                <button
                  key={realIdx}
                  className="photo-radio-btn-img"
                  onClick={() => handleRadioClick(realIdx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 2,
                  }}
                >
                  <img
                    src={activePhotoIndex === realIdx ? radioBtnActive : radionBtn}
                    alt={
                      activePhotoIndex === realIdx
                        ? 'Активная радиокнопка'
                        : 'Радиокнопка'
                    }
                  />
                </button>
              );
            });
          })()}
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
              flexDirection: 'column',
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: 1,
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
              p.type === 'li' ? (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    color: '#ffffff',
                    fontWeight: 300,
                    fontSize: 32,
                    opacity: 0.9,
                    fontFamily: 'Akrobat',
                    marginBottom: idx < text.description.length - 1 ? 24 : 0,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 8,
                      height: 8,
                      marginTop: 18,
                      marginLeft: 5,
                      borderRadius: '50%',
                      backgroundColor: 'currentColor',
                    }}
                  />
                  <span style={{ lineHeight: 1.4 }}>{p.text}</span>
                </div>
              ) : (
                <p
                  key={idx}
                  style={{
                    color: '#ffffff',
                    fontWeight: 300,
                    fontSize: 32,
                    opacity: 0.9,
                    fontFamily: 'Akrobat',
                    marginBottom: idx < text.description.length - 1 ? 24 : 0,
                  }}
                >
                  {p.text}
                </p>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
