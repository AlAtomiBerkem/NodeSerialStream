import LbtnPushed from '../../UI/selectioAndMoveBtn/LbtnPushed.svg';
import LbtnActive from '../../UI/selectioAndMoveBtn/LbtnActive.svg';
import RbtnPushed from '../../UI/selectioAndMoveBtn/RbtnPushed.svg';
import RbtnBlue from '../../UI/selectioAndMoveBtn/RbtnBlue.svg';
import RbtnActive from '../../UI/selectioAndMoveBtn/RbtnActive.svg';
import BlueBtnPushed from '../../UI/selectioAndMoveBtn/BlueBtnPushed.svg'

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