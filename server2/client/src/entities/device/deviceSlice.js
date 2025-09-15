import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idTab: null,
    connected: false,
    registered: null,
    lastUpdateAt: null,
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        wsConnected(state) {
            state.connected = true;
        },
        wsDisconnected(state) {
            state.connected = false;
        },
        setIdTab(state, action) {
            state.idTab = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setRegistered(state, action) {
            state.registered = action.payload;
            state.lastUpdateAt = Date.now();
        },
    },
});

export const { wsConnected, wsDisconnected, setIdTab, setRegistered } = deviceSlice.actions;
export default deviceSlice.reducer;


