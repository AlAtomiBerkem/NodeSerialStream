import { createSlice } from '@reduxjs/toolkit';
import ant2 from '../../assets/ant-2.png';
import tb2 from '../../assets/tb-2.png';
import tupolev from '../../assets/tupolev.png';

const initialState = {
  photos: {
    1: [
      { id: 1, url: ant2, caption: ' АТ-2 ' },
      { id: 2, url: tb2, caption: ' ТБ-2 ' },
      { id: 3, url: tupolev, caption: ' Туполев ' },
    ],
    2: [
      { id: 5, url: tb2, caption: ' АТ-2 ' },
      { id: 6, url: tupolev, caption: ' ТБ-2 ' },
      { id: 7, url: tupolev, caption: ' Туполев ' },
      { id: 8, url: tb2, caption: ' ТБ-2 ' },
      { id: 9, url: ant2, caption: ' АТ-2 ' },
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
