import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [
    { id: 1, title: 'Карточка 1' },
    { id: 2, title: 'Карточка 2' },
  ],
};


export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
});

export default cardsSlice.reducer;
