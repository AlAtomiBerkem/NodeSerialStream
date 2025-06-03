import { useState, useEffect } from 'react';

export const useButtonLogic = (onNextQuestion) => {
  const [uiState, setUiState] = useState({
    selectedOption: null,      // 'true' | 'false' | null
    leftBtnState: 'default',   // 'default' | 'pushed'
    rightBtnState: 'default',  // 'default' | 'blue' | 'pushed'
    leftBtnClicked: false,
    rightBtnClicked: false
  });

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

   useEffect(() => {
    if (uiState.rightBtnClicked) {
      const timer = setTimeout(() => {
         if (uiState.rightBtnState === 'blue') {
          onNextQuestion(); 
        }
        
        setUiState(prev => ({
          ...prev,
          rightBtnClicked: false,
          rightBtnState: prev.selectedOption ? 'blue' : 'default',
          selectedOption: null 
        }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [uiState.rightBtnClicked, uiState.rightBtnState, onNextQuestion]);

  const handleSelect = (option) => {
    setUiState(prev => ({
      ...prev,
      selectedOption: option,
      rightBtnState: 'blue', 
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