import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './btnSlice';

export const store = configureStore({
  reducer: {
    buttons: buttonReducer
  }
}); 