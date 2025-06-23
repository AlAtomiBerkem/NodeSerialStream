import { configureStore } from '@reduxjs/toolkit'
import CardReducer from './slices/cardsSlice.js'
import PhotoReducer from './slices/photoSlice.js'

export const store = configureStore({
    reducer: {
        cards: CardReducer,
        photos: PhotoReducer
    }
});

export default store;