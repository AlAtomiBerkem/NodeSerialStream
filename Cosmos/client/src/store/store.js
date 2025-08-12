import { configureStore } from '@reduxjs/toolkit'
import PhotoSlice from './Photoslice.js'

export const store = configureStore({
    reducer: {
        photo: PhotoSlice
    }
})

