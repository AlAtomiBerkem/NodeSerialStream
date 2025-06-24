import React from 'react';
import '../../styles/Card.css';
import photo from '../../assets/ant-2.png';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePhoto } from '../../store/slices/photoSlice';
import radionBtn from '../../assets/buttons/radionBtn.png';
import radioBtnActive from '../../assets/buttons/radioBtnActive.png';
import cardTexts from '../../store/texts/cardTexts';
import '../../styles/CardTexts.css';

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const activePhotoIndex = useSelector(state => state.photos.activePhotoIndex[card.id]);
  const photos = useSelector(state => state.photos.photos[card.id]);
  const photoUrl = photos && photos[activePhotoIndex] && photos[activePhotoIndex].url ? photos[activePhotoIndex].url : '';
  const text = cardTexts[card.id];

  const handleRadioClick = (idx) => { 
    dispatch(setActivePhoto({ cardId: card.id, photoIndex: idx }));
  };

  return (
    <div className="card">
      <div className="card-photo">
        <div className="photo-placeholder">
          <div className="photo-phocus">
            {photoUrl && (
              <img className="photo-img" src={photoUrl} alt="Фото" />
            )}
          </div>
        </div>
        <div className="photo_radio_buttons">
        {photos && photos.map((_, idx) => (
          <button
            key={idx}
            className="photo-radio-btn-img"
            onClick={() => handleRadioClick(idx)}
            style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer' }}
          >
            <img
              src={activePhotoIndex === idx ? radioBtnActive : radionBtn}
              alt={activePhotoIndex === idx ? 'Активная радиокнопка' : 'Радиокнопка'}
            />
          </button>
        ))}
      </div>
      </div>
      <div className="card-content">
        <div className="card-description custom-scroll">
          <h2 className="card-title">{text.title}</h2>
          <p>{card.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
