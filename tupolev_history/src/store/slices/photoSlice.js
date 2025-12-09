import { createSlice } from '@reduxjs/toolkit';
import screen1 from '../../assets/screan1/1.1.png';
import screen2 from '../../assets/screan1/1.2.png';
import screen3 from '../../assets/screan1/1.3.png';
import screen4 from '../../assets/screan1/1.4.png';
import screen5 from '../../assets/screan1/1.5.png';

import screen21 from '../../assets/screan2/2.1.png';
import screen22 from '../../assets/screan2/2.2.png';
import screen23 from '../../assets/screan2/2.3.png';
import screen24 from '../../assets/screan2/2.4.png';
import screen25 from '../../assets/screan2/2.5.png';
import screen26 from '../../assets/screan2/2.6.png';
import screen27 from '../../assets/screan2/2.7.png';
import screen28 from '../../assets/screan2/2.8.png';
import screen29 from '../../assets/screan2/2.9.png';

import screen31 from '../../assets/screan3/3.1.png';
import screen32 from '../../assets/screan3/3.2.png';
import screen33 from '../../assets/screan3/3.3.png';
import screen34 from '../../assets/screan3/3.4.png';
import screen35 from '../../assets/screan3/3.5.png';
import screen36 from '../../assets/screan3/3.6.png';
import screen37 from '../../assets/screan3/3.7.png';
import screen38 from '../../assets/screan3/3.8.png';

import screen41 from '../../assets/screan4/4.1.png';
import screen42 from '../../assets/screan4/4.2.png';
import screen43 from '../../assets/screan4/4.3.png';
import screen44 from '../../assets/screan4/4.4.png';
import screen45 from '../../assets/screan4/4.5.png';
import screen46 from '../../assets/screan4/4.6.png';
import screen47 from '../../assets/screan4/4.7.png';
import screen48 from '../../assets/screan4/4.8.png';
import screen49 from '../../assets/screan4/4.9.png';
import screen410 from '../../assets/screan4/4.10.png';
import screen411 from '../../assets/screan4/4.11.png';
import screen412 from '../../assets/screan4/4.12.png';
import screen413 from '../../assets/screan4/4.13.png';

import screen51 from '../../assets/screan5/5.1.png';
import screen52 from '../../assets/screan5/5.2.png';
import screen53 from '../../assets/screan5/5.3.png';
import screen54 from '../../assets/screan5/5.4.png';
import screen55 from '../../assets/screan5/5.5.png';
import screen56 from '../../assets/screan5/5.6.png';
import screen57 from '../../assets/screan5/5.7.png';
import screen58 from '../../assets/screan5/5.8.png';

const initialState = {
  photos: {
    1: [
      { id: 1, url: screen1 },
      { id: 2, url: screen2 },
      { id: 3, url: screen3 },
      { id: 4, url: screen4 },
      { id: 5, url: screen5 },
    ],
    2: [
      { id: 5, url: screen21 },
      { id: 6, url: screen22 },
      { id: 7, url: screen23 },
      { id: 8, url: screen24 },
      { id: 9, url: screen25 },
      { id: 10, url: screen26 },
      { id: 11, url: screen27 },
      { id: 12, url: screen28 },
      { id: 13, url: screen29 },
    ],
    3: [
      { id: 14, url: screen31 },
      { id: 15, url: screen32 },
      { id: 16, url: screen33 },
      { id: 17, url: screen34 },
      { id: 18, url: screen35 },
      { id: 19, url: screen36 },
      { id: 20, url: screen37 },
      { id: 21, url: screen38 },
    ],
    4: [
      { id: 22, url: screen41 },
      { id: 23, url: screen42 },
      { id: 24, url: screen43 },
      { id: 25, url: screen44 },
      { id: 26, url: screen45 },
      { id: 27, url: screen46 },
      { id: 28, url: screen47 },
      { id: 29, url: screen48 },
      { id: 30, url: screen49 },
      { id: 31, url: screen410 },
      { id: 32, url: screen411 },
      { id: 33, url: screen412 },
      { id: 34, url: screen413 },
    ],
    5: [
      { id: 35, url: screen51 },
      { id: 36, url: screen52 },
      { id: 37, url: screen53 },
      { id: 38, url: screen54 },
      { id: 39, url: screen55 },
      { id: 40, url: screen56 },
      { id: 41, url: screen57 },
      { id: 42, url: screen58 },
    ],
  },
  activePhotoIndex: {
    1: 1,
    2: 5,
    3: 14,
    4: 22,
    5: 35,
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
