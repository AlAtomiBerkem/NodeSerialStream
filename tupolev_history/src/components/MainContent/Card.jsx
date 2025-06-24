import React from 'react';
import '../../styles/Card.css';
import photo from '../../assets/ant-2.png';
import RadionButtons from './RadionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePhoto } from '../../store/slices/photoSlice';
import LbtnBlue from '../../UI/selectioAndMoveBtn/LbtnBlue.svg';
import RbtnBlue from '../../UI/selectioAndMoveBtn/RbtnBlue.svg';

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const activePhotoIndex = useSelector(state => state.photos.activePhotoIndex[card.id]);
  const photos = useSelector(state => state.photos.photos[card.id]);
  const photoUrl = photos && photos[activePhotoIndex] && photos[activePhotoIndex].url ? photos[activePhotoIndex].url : photo;

  const handleRadioClick = (idx) => {
    dispatch(setActivePhoto({ cardId: card.id, photoIndex: idx }));
  };

  return (
    <div className="card">
      <div className="card-photo">
        <div className="photo-placeholder">
          <div className="photo-phocus">
            <img className="photo-img" src={photoUrl} alt="Фото" />
          </div>
        </div>
        <div className="photo_radio_buttons">
          {photos && photos.map((_, idx) => (
            <button
              key={idx}
              className={`photo-radio-btn${activePhotoIndex === idx ? ' active' : ''}`}
              onClick={() => handleRadioClick(idx)}
            />
          ))}
        </div>
      </div>
      <div className="card-content">
        <div className="card-description custom-scroll">
          <p>{card.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
