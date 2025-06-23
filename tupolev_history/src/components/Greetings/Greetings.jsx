import React from 'react';
import greetingImg from '../../assets/greetings.png';
import ButtonStart from './ButoonStart.jsx';
import './Greetings.css';

const Greetings = ({ onStart }) => {
  return (
    <div className="greetings-container">
      <img src={greetingImg} alt="Приветствие" className="greeting-image" />
      <div className="button-wrapper">
        <ButtonStart onClick={onStart} />
      </div>
    </div>
  );
};

export default Greetings;