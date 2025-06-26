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
  const touchEndX = useRef(null);

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
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0 && activePhotoIndex < photos.length - 1) {
        dispatch(setActivePhoto({ cardId: card.id, photoIndex: activePhotoIndex + 1 }));
      } else if (delta > 0 && activePhotoIndex > 0) {
        dispatch(setActivePhoto({ cardId: card.id, photoIndex: activePhotoIndex - 1 }));
      }
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="card-photo">
        <div className="photo-placeholder">
          <div
            className="photo-phocus"
            style={{position: 'relative'}}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
                  fontSize: 26,
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
                  cursor: 'pointer',
                }}
              >
                <img
                  src={activePhotoIndex === idx ? radioBtnActive : radionBtn}
                  alt={
                    activePhotoIndex === idx
                      ? 'Активная радиокнопка adfadfadfafd'
                      : 'Радиокнопка'
                  }
                />
              </button>
            ))}
        </div>
      </div>
      <div className="card-content">
        <div className="card-title" style={{display:'flex', alignItems:'flex-end', gap: '18px', marginBottom: 16, flexWrap: 'wrap'}}>
          {Array.isArray(text.title) && text.title.map((part, idx) => {
            if (part.type === 'number') return (
              <span key={idx} style={{color:'#fff', fontSize:64, fontWeight:700, fontFamily:'Akrobat, Arial, sans-serif', lineHeight:'1', letterSpacing:2}}>{part.text}</span>
            );
            if (part.type === 'main') return (
              <span key={idx} style={{color:'#3EC6FF', fontFamily:'Akrobat, Arial, sans-serif'}}>{part.text}</span>
            );
            if (part.type === 'accent') return (
              <>
                <span key={idx} style={{color:'#3EC6FF', fontFamily:'Akrobat, Arial, sans-serif'}}>{part.text}</span>
                <hr style={{width:'100%', border:'none', borderTop:'2px solid #fff', margin:'12px 0 0 0'}} />
              </>
            );
            return null;
          })}

        </div>
        <div className="card-desc">
          {Array.isArray(text.description) && text.description.map((p, idx) => (
            <p key={idx} style={{color:'#fff', marginBottom: idx < text.description.length-1 ? 24 : 0}}>{p.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
