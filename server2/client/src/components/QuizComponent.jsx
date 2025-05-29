import backdrop from '../UI/backdrops/qqq.png';
import scaleBody from '../UI/scale/scaleBody.svg'

import { useState } from 'react'
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

export const QuizCompleted = () => {
  // Единый объект состояния
  const [uiState, setUiState] = useState({
    selectedOption: null,      // 'true' | 'false' | null
    leftBtnState: 'default',   // 'default' | 'hover' | 'selected'
    rightBtnState: 'default',  // 'default' | 'hover' | 'selected'
  });

  // Обработчик выбора "правды" или "лжи"
  const handleSelect = (option) => {
    setUiState({
      selectedOption: option,
      leftBtnState: 'selected',
      rightBtnState: 'selected',
    });
  };

  // Обработчики hover для навигационных кнопок
  const handleLeftBtnHover = (isHovered) => {
    if (uiState.selectedOption) return; // Игнорируем hover после выбора
    
    setUiState({
      ...uiState,
      leftBtnState: isHovered ? 'hover' : 'default',
    });
  };

  const handleRightBtnHover = (isHovered) => {
    if (uiState.selectedOption) return; // Игнорируем hover после выбора
    
    setUiState({
      ...uiState,
      rightBtnState: isHovered ? 'hover' : 'default',
    });
  };

  // Функции для определения текущих изображений
  const getLeftBtnImage = () => {
    if (uiState.leftBtnState === 'hover') return LbtnPushed;
    if (uiState.selectedOption) return LbtnBlue;
    return LbtnActive;
  };

  const getRightBtnImage = () => {
    if (uiState.rightBtnState === 'hover') return RbtnPushed;
    if (uiState.selectedOption) return RbtnBlue;
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
        inactiveImg={getLeftBtnImage()} // Используем ту же картинку, так как состояние управляется через hover
        onClick={() => {}} // Пока оставляем пустым или добавляем логику навигации
        onMouseEnter={() => handleLeftBtnHover(true)}
        onMouseLeave={() => handleLeftBtnHover(false)}
        alt="Left navigation"
      />
      
      <ButtonQuiz
        top="89%"
        left="80.5%"
        activeImg={getRightBtnImage()}
        inactiveImg={getRightBtnImage()}
        onClick={() => {}} // Пока оставляем пустым или добавляем логику навигации
        onMouseEnter={() => handleRightBtnHover(true)}
        onMouseLeave={() => handleRightBtnHover(false)}
        alt="Right navigation"
      />
    </div>
  );
};

export default QuizCompleted;