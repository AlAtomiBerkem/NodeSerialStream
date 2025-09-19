import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idTab: null,
    connected: false,
    comConnected: null,
    tagPlaced: null,
    registered: null,
    readiness: null,
    overall: null,
    test: null,
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
        setComConnected(state, action) {
            state.comConnected = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setTagPlaced(state, action) {
            state.tagPlaced = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setIdTab(state, action) {
            state.idTab = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setRegistered(state, action) {
            state.registered = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setReadiness(state, action) {
            state.readiness = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setOverall(state, action) {
            state.overall = action.payload;
            state.lastUpdateAt = Date.now();
        },
        setTest(state, action) {
            state.test = action.payload;
            state.lastUpdateAt = Date.now();
        },
    },
});

export const { wsConnected, wsDisconnected, setIdTab, setRegistered, setReadiness, setOverall, setComConnected, setTagPlaced, setTest } = deviceSlice.actions;
export default deviceSlice.reducer;



