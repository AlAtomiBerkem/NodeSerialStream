import { createSlice } from '@reduxjs/toolkit'

const btnPhoto = createSlice({
    name: 'buttonPhoto',
    initialState: false,
    reducers: {
        pushed: () => true,
        unPushed: () => false,
    },
})

export const { pushed, unPushed } = btnPhoto.actions;
export default btnPhoto.reducer;