import testStartBackdrop from '../UI/backdrops/testStartBackdrop.png';
import startButton from '../UI/startButtons/startActive.svg';
import startButtonActive from '../UI/startButtons/startActiveSelect.svg';
import BackButton from '../UI/bigBackButtons/bigBackBtnActiveSelect.svg';
import BackButtonPushed from '../UI/bigBackButtons/bigBackBtnActiveEmpty.svg';
import { useState } from 'react';

export const TestingStart = ({ onStartButtonClick, onBackButtonClick }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isBtnBack, setIsBtnBack] = useState(false);

  const handleStartClick = () => {
    setIsButtonPressed(!isButtonPressed);
    onStartButtonClick();
  };

  const handleBackClick = () => {
    setIsBtnBack(!isBtnBack);
    onBackButtonClick();
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${testStartBackdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <button
        onClick={handleStartClick}
        style={{
          position: 'absolute',
          top: '72.1%',
          left: '50.1%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img
          src={isButtonPressed ? startButtonActive : startButton}
          alt="Start Button"
        />
      </button>

      <button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '9%',
          left: '10.3%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img
          src={isBtnBack ? BackButtonPushed : BackButton}
          alt="Back Button"
        />
      </button>
    </div>
  );
};

export default TestingStart;
