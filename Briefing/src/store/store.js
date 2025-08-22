import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './buttonStore';

export const store = configureStore({
  reducer: {
    buttons: buttonReducer
  }
}); 