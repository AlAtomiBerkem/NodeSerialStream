import { createSlice } from '@reduxjs/toolkit';
import ant2 from '../../assets/ant-2.png';
import tb2 from '../../assets/tb-2.png';
import tupolev from '../../assets/tupolev.png';

const initialState = {
  photos: {
    1: [
      { id: 1, url: ant2 },
      { id: 2, url: tb2 },
      { id: 3, url: tupolev },
    ],
    2: [
      { id: 5, url: ant2 },
      { id: 6, url: tb2 },
      { id: 7, url: tupolev },
      { id: 8, url: tb2 },
      { id: 9, url: ant2 },
    ],
  },
  activePhotoIndex: {
    1: 0,
    2: 0,
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