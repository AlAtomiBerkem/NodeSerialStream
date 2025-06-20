import React from 'react';
import greetingImg from '../../assets/greetings.png';
import ButtonStart from './ButoonStart';
import './Greetings.css'

const Greetings = () => {
  return (
    <div className="greetings-container">
      <img
        src={greetingImg}
        alt="Приветствие"
        className="greeting-image"
      />
      <div className="button-wrapper">
        <ButtonStart />
      </div>
    </div>
  );
};

export default Greetings;