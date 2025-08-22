import { createSlice } from '@reduxjs/toolkit';

const buttonSlice = createSlice({
  name: 'buttons',
  initialState: {
    activeButton: null,
    buttonStates: {}
  },
  reducers: {
    activateButton: (state, action) => {
      const buttonId = action.payload;
      console.log(`Redux: Активирую кнопку ${buttonId}`);
      
      // Деактивируем все кнопки
      Object.keys(state.buttonStates).forEach(key => {
        state.buttonStates[key] = false;
      });
      
      // Активируем только выбранную кнопку
      state.activeButton = buttonId;
      state.buttonStates[buttonId] = true;
      
      console.log(`Redux: Состояние после активации:`, state.buttonStates);
    },
    deactivateButton: (state, action) => {
      const buttonId = action.payload;
      console.log(`Redux: Деактивирую кнопку ${buttonId}`);
      state.buttonStates[buttonId] = false;
      if (state.activeButton === buttonId) {
        state.activeButton = null;
      }
      console.log(`Redux: Состояние после деактивации:`, state.buttonStates);
    },
    resetAllButtons: (state) => {
      console.log(`Redux: Сбрасываю все кнопки`);
      state.activeButton = null;
      state.buttonStates = {};
    }
  }
});

export const { activateButton, deactivateButton, resetAllButtons } = buttonSlice.actions;
export default buttonSlice.reducer; 