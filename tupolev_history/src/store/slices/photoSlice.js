import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: {
    1: [ 
      { id: 1, url: '' },
      { id: 2, url: '' },
    ],
    2: [
      { id: 3, url: '' },
      { id: 4, url: '' },
    ],
  },
  activePhotoIndex: {
    1: 0, 
    2: 1,
  },
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setActivePhoto: (state, action) => {
      const { cardId, photoIndex } = action.payload;
      state.activePhotoIndex[cardId] = photoIndex;
    },
  },
});

export const { setActivePhoto } = photosSlice.actions;
export default photosSlice.reducer;