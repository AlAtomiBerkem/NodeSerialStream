import LbtnPushed from '../../UI/selectioAndMoveBtn/LbtnPushed.svg';
import LbtnBlue from '../../UI/selectioAndMoveBtn/LbtnBlue.svg';
import LbtnActive from '../../UI/selectioAndMoveBtn/LbtnActive.svg';
import RbtnBluePushed from '../../UI/selectioAndMoveBtn/BlueBtnPushed.svg';
import RbtnPushed from '../../UI/selectioAndMoveBtn/RbtnPushed.svg';
import RbtnBlue from '../../UI/selectioAndMoveBtn/RbtnBlue.svg';
import RbtnActive from '../../UI/selectioAndMoveBtn/RbtnActive.svg';

export const getLeftBtnImage = (uiState) => {
  if (uiState.leftBtnState === 'pushed' || uiState.leftBtnClicked) {
    return uiState.selectedOption ? LbtnPushed : LbtnPushed;
  }
  if (uiState.leftBtnState === 'hover') return LbtnPushed;
  if (uiState.leftBtnState === 'hover') return LbtnBlue;
  if (uiState.leftBtnState === 'blue-hover') return LbtnPushed;
  return LbtnActive;
};

export const getRightBtnImage = (uiState) => {
  if (uiState.rightBtnState === 'pushed' || uiState.rightBtnClicked) {
    return uiState.selectedOption ? RbtnBluePushed : RbtnPushed;
  }
  if (uiState.rightBtnState === 'hover') return RbtnPushed;
  if (uiState.rightBtnState === 'blue') return RbtnBlue;
  if (uiState.rightBtnState === 'blue-hover') return RbtnBluePushed;
  return RbtnActive;
};
import { useState, useEffect } from 'react';

export const useButtonLogic = () => {
  const [uiState, setUiState] = useState({
    selectedOption: null,      // 'true' | 'false' | null
    leftBtnState: 'default',   // 'default' | 'hover' | 'pushed'
    rightBtnState: 'default',  // 'default' | 'hover' | 'pushed' | 'blue' | 'blue-pushed'
    leftBtnClicked: false,
    rightBtnClicked: false
  });

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

  return {
    uiState,
    handleSelect,
    handleLeftBtnClick,
    handleRightBtnClick,
    handleLeftBtnHover,
    handleRightBtnHover
  };
};

import React from 'react';