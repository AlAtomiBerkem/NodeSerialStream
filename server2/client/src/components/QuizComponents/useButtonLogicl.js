import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedOption,
  pushLeftButton,
  pushRightButton,
  resetButtonStates
} from '../../store/slices/uiSlice';

export const useButtonLogic = (onNextQuestion) => {
  const dispatch = useDispatch();
  const buttonsState = useSelector(state => state.ui.buttons);

  useEffect(() => {
    if (buttonsState.leftBtnClicked) {
      const timer = setTimeout(() => {
        dispatch(resetButtonStates());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [buttonsState.leftBtnClicked, dispatch]);

  useEffect(() => {
    if (buttonsState.rightBtnClicked) {
      const timer = setTimeout(() => {
        if (buttonsState.rightBtnState === 'bluePushed') {
          onNextQuestion();
        }
        dispatch(resetButtonStates());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [buttonsState.rightBtnClicked, buttonsState.rightBtnState, dispatch, onNextQuestion]);

  const handleSelect = (option) => {
    dispatch(setSelectedOption(option));
  };

  const handleLeftBtnClick = () => {
    dispatch(pushLeftButton());
  };

  const handleRightBtnClick = () => {
    dispatch(pushRightButton());
  };

  return {
    uiState: buttonsState,
    handleSelect,
    handleLeftBtnClick,
    handleRightBtnClick
  };
};