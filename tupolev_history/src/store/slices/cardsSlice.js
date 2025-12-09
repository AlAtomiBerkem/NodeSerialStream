import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: {
    inventions: [
      { 
        id: 1, title: 'Карточка 1' }],
    patents: [
      { 
        id: 2, title: 'Карточка 1' },
    ],
    licenses: [
      { 
        id: 3, title: 'Карточка 3' },
    ],
    projects: [
      {
        id: 4, title: 'Карточка 4'
      }
    ],
    awards: [
      {
        id: 5, title: 'Карточка 5'
      }
    ],
  },
};


export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
});

export default cardsSlice.reducer;