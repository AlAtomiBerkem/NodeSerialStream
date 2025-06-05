import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizeSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});