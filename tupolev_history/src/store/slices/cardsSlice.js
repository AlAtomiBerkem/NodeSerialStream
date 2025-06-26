import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: {
    inventions: [{ id: 2, title: 'Карточка 1' }],
    patents: [
      { id: 1, title: 'Карточка 1' },
      { id: 2, title: 'Карточка 2' }
    ],
    licenses: [
      { id: 2, title: 'Карточка 2' },
      { id: 1, title: 'Карточка 1' }
    ],
  },
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
});

export default cardsSlice.reducer;