import { configureStore } from '@reduxjs/toolkit';
import CardReducer from './slices/cardsSlice.js';
import PhotoReducer from './slices/photoSlice.js';
import SectionReducer from './slices/sectionSlice.js';

export const store = configureStore({
  reducer: {
    cards: CardReducer,
    photos: PhotoReducer,
    section: SectionReducer,
  },
});

export default store;
