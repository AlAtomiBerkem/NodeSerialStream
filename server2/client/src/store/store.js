import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizeSlice';
import selectionReducer from './slices/selectionSlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    selection: selectionReducer,

  },
});