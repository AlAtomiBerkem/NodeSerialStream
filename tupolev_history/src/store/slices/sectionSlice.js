import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSection: 'inventions', // дефолтный раздел — А. Н. ТУПОЛЕВ
};

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setSection } = sectionSlice.actions;
export default sectionSlice.reducer;
