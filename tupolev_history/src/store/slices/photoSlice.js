import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: {
    1: [ 
      { id: 1, url: '../../assets/ant-2.png' },
      { id: 2, url: '../../assets/tb-2' },
      { id: 3, url: '../../assets/tupolev' },
      { id: 4, url: '' },

    ],
    2: [
      { id: 5, url: '../../assets/ant-2.png' },
      { id: 6, url: '../../assets/tb-2' },
      { id: 7, url: '../../assets/tupolev' },
      { id: 8, url: '../../assets/tb-2' },
      { id: 9, url: '../../assets/ant-2.png' },


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