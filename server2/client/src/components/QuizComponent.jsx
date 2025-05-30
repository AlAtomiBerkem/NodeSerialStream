import backdrop from '../UI/backdrops/qqq.png';
import scaleBody from '../UI/scale/scaleBody.svg'

import { useState, useEffect } from 'react'
import ButtonQuiz from '../helpers/ButoonQuiz';

import TrueCheckDone from '../UI/selectioAndMoveBtn/TryCheck.svg';
import TrueCheck from '../UI/selectioAndMoveBtn/TryUnCheck.svg'

import FakeCheck from '../UI/selectioAndMoveBtn/FakeUnCheck.svg'
import FakeCheckDone from '../UI/selectioAndMoveBtn/FakeCheck.svg'

import LbtnBlue from '../UI/selectioAndMoveBtn/LbtnBlue.svg'
import RbtnBlue from '../UI/selectioAndMoveBtn/RbtnBlue.svg'
import RbtnActive from '../UI/selectioAndMoveBtn/RbtnActive.svg'
import LbtnActive from '../UI/selectioAndMoveBtn/LbtnActive.svg'
import LbtnPushed from '../UI/selectioAndMoveBtn/LbtnPushed.svg'
import RbtnPushed from '../UI/selectioAndMoveBtn/RbtnPushed.svg'
import RbtnBluePushed from '../UI/selectioAndMoveBtn/BlueBtnPushed.svg'

export const QuizCompleted = () => {
  const [uiState, setUiState] = useState({
    selectedOption: null,      // 'true' | 'false' | null
    leftBtnState: 'default',   // 'default' | 'hover' | 'pushed'
    rightBtnState: 'default',  // 'default' | 'hover' | 'pushed' | 'blue' | 'blue-pushed'
    leftBtnClicked: false,
    rightBtnClicked: false
  });

  // Эффект для сброса состояния pushed через 200 мс
  useEffect(() => {
    if (uiState.leftBtnClicked) {
      const timer = setTimeout(() => {
        setUiState(prev => ({
          ...prev,
          leftBtnClicked: false,
          leftBtnState: prev.selectedOption ? 'blue' : 'default'
        }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uiState.leftBtnClicked]);

  useEffect(() => {
    if (uiState.rightBtnClicked) {
      const timer = setTimeout(() => {
        setUiState(prev => ({
          ...prev,
          rightBtnClicked: false,
          rightBtnState: prev.selectedOption ? 'blue' : 'default'
        }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uiState.rightBtnClicked]);

  const handleSelect = (option) => {
    setUiState({
      ...uiState,
      selectedOption: option,
      leftBtnState: 'blue',
      rightBtnState: 'blue',
      leftBtnClicked: false,
      rightBtnClicked: false
    });
  };

  const handleLeftBtnClick = () => {
    setUiState({
      ...uiState,
      leftBtnState: uiState.selectedOption ? 'blue-pushed' : 'pushed',
      leftBtnClicked: true
    });
    // Здесь можно добавить логику навигации
  };

  const handleRightBtnClick = () => {
    setUiState({
      ...uiState,
      rightBtnState: uiState.selectedOption ? 'blue-pushed' : 'pushed',
      rightBtnClicked: true
    });
    // Здесь можно добавить логику навигации
  };

  const handleLeftBtnHover = (isHovered) => {
    if (uiState.leftBtnClicked) return;
    
    setUiState({
      ...uiState,
      leftBtnState: isHovered 
        ? (uiState.selectedOption ? 'default' : 'hover') 
        : (uiState.selectedOption ? 'blue' : 'default'),
    });
  };

  const handleRightBtnHover = (isHovered) => {
    if (uiState.rightBtnClicked) return;
    
    setUiState({
      ...uiState,
      rightBtnState: isHovered 
        ? (uiState.selectedOption ? 'blue-hover' : 'hover') 
        : (uiState.selectedOption ? 'blue' : 'default'),
    });
  };

  const getLeftBtnImage = () => {
    if (uiState.leftBtnState === 'pushed' || uiState.leftBtnClicked) {
      return uiState.selectedOption ? LbtnPushed : LbtnPushed;
    }
    if (uiState.leftBtnState === 'hover') return LbtnPushed;
    if (uiState.leftBtnState === 'hover') return LbtnBlue;
    if (uiState.leftBtnState === 'blue-hover') return LbtnPushed;
    return LbtnActive;
  };

  const getRightBtnImage = () => {
    if (uiState.rightBtnState === 'pushed' || uiState.rightBtnClicked) {
      return uiState.selectedOption ? RbtnBluePushed : RbtnPushed;
    }
    if (uiState.rightBtnState === 'hover') return RbtnPushed;
    if (uiState.rightBtnState === 'blue') return RbtnBlue;
    if (uiState.rightBtnState === 'blue-hover') return RbtnBluePushed;
    return RbtnActive;
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Шкала */}
      <div
        style={{
          position: 'absolute',
          top: '10.5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img src={scaleBody} alt="scale" />
      </div>

      {/* Кнопки выбора */}
      <ButtonQuiz
        top="89%"
        left="38%"
        activeImg={TrueCheckDone}
        inactiveImg={TrueCheck}
        onClick={() => handleSelect('true')}
        isActive={uiState.selectedOption === 'true'}
        alt="True option"
      />
      
      <ButtonQuiz
        top="89%"
        left="65%"
        activeImg={FakeCheckDone}
        inactiveImg={FakeCheck}
        onClick={() => handleSelect('false')}
        isActive={uiState.selectedOption === 'false'}
        alt="False option"
      />

      {/* Навигационные кнопки */}
      <ButtonQuiz
        top="89%"
        left="22.5%"
        activeImg={getLeftBtnImage()}
        inactiveImg={getLeftBtnImage()}
        onClick={handleLeftBtnClick}
        onMouseEnter={() => handleLeftBtnHover(true)}
        onMouseLeave={() => handleLeftBtnHover(false)}
        alt="Left navigation"
      />
      
      <ButtonQuiz
        top="89%"
        left="80.5%"
        activeImg={getRightBtnImage()}
        inactiveImg={getRightBtnImage()}
        onClick={handleRightBtnClick}
        onMouseEnter={() => handleRightBtnHover(true)}
        onMouseLeave={() => handleRightBtnHover(false)}
        alt="Right navigation"
      />
    </div>
  );
};
export default QuizCompleted;