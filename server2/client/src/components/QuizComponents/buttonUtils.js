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