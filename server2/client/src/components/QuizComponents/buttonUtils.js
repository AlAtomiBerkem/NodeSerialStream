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
  switch (uiState.rightBtnState) {
    case 'bluePushed':
      return BlueBtnPushed;  
    case 'pushed':
      return RbtnPushed;
    case 'blue':
      return RbtnBlue;
    default:
      return RbtnActive;
  }
};