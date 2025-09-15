import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizeSlice';
import selectionReducer from './slices/selectionSlice';
import uiReducer from './slices/uiSlice';
import deviceReducer from '../entities/device/deviceSlice.js';

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        selection: selectionReducer,
        ui: uiReducer,
        device: deviceReducer,
    },
});
