import {
  LbtnPushed,  
  LbtnActive, 
  RbtnPushed,
  RbtnBlue,
  RbtnActive, 
  BlueBtnPushed,
} from './imports.js'  

export const getLeftBtnImage = (uiState) => {
  if (uiState.leftBtnState === 'pushed' || uiState.leftBtnClicked) {
    return LbtnPushed;
  }
  return LbtnActive;
};

export const getRightBtnImage = (uiState) => {
  if (uiState.rightBtnClicked && uiState.rightBtnState === 'blue') {
    return BlueBtnPushed;
  }
  if (uiState.rightBtnState === 'pushed' || uiState.rightBtnClicked) {
    return RbtnPushed;
  }
  if (uiState.rightBtnState === 'blue') {
    return RbtnBlue;
  }
  return RbtnActive;
};