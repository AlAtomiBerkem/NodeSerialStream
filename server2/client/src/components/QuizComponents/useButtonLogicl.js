import { useState, useEffect } from 'react';

export const useButtonLogic = (onNextQuestion) => {
  const [uiState, setUiState] = useState({
    selectedOption: null,      // 'true' | 'false' | null
    leftBtnState: 'default',   // 'default' | 'pushed'
    rightBtnState: 'default',  // 'default' | 'blue' | 'pushed'
    leftBtnClicked: false,
    rightBtnClicked: false
  });

  // Сброс состояния нажатия левой кнопки через 200 мс
  useEffect(() => {
    if (uiState.leftBtnClicked) {
      const timer = setTimeout(() => {
        setUiState(prev => ({
          ...prev,
          leftBtnClicked: false,
          leftBtnState: 'default'
        }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uiState.leftBtnClicked]);

  // Обработка нажатия правой кнопки
  useEffect(() => {
    if (uiState.rightBtnClicked) {
      const timer = setTimeout(() => {
        // Если кнопка была синей (выбран ответ), переходим к следующему вопросу
        if (uiState.rightBtnState === 'blue') {
          onNextQuestion(); // Вызываем колбэк для перехода к следующему вопросу
        }
        
        setUiState(prev => ({
          ...prev,
          rightBtnClicked: false,
          rightBtnState: prev.selectedOption ? 'blue' : 'default',
          selectedOption: null // Сбрасываем выбранный ответ
        }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uiState.rightBtnClicked, uiState.rightBtnState, onNextQuestion]);

  const handleSelect = (option) => {
    setUiState(prev => ({
      ...prev,
      selectedOption: option,
      rightBtnState: 'blue', // Правая кнопка становится синей при выборе ответа
      leftBtnState: 'default',
      leftBtnClicked: false,
      rightBtnClicked: false
    }));
  };

  const handleLeftBtnClick = () => {
    setUiState(prev => ({
      ...prev,
      leftBtnState: 'pushed',
      leftBtnClicked: true
    }));
  };

  const handleRightBtnClick = () => {
    setUiState(prev => ({
      ...prev,
      rightBtnState: prev.selectedOption ? 'blue' : 'default',
      rightBtnClicked: true
    }));
  };

  return {
    uiState,
    handleSelect,
    handleLeftBtnClick,
    handleRightBtnClick
  };
};