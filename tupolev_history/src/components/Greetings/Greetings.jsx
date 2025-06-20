import React from 'react';
import greetingImg from '../../assets/greetings.png';
import ButoonStart from './ButoonStart.jsx';
import './Greetings.css';

const Greetings = () => {
  return (
    <div className="greetings-container">
      <img
        src={greetingImg}
        alt="Приветствие"
        className="greeting-image"
      />
      <div className="button-wrapper">
        <ButoonStart />
      </div>
    </div>
  );
};

export default Greetings;