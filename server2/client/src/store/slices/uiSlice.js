import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttons: {
        selectedOption: null, // 'true' | 'false' | null
        leftBtnState: 'default', // 'default' | 'pushed'
        rightBtnState: 'default', // 'default' | 'blue' | 'pushed' | 'bluePushed'
        leftBtnClicked: false,
        rightBtnClicked: false,
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedOption(state, action) {
            state.buttons.selectedOption = action.payload;
            // При выборе ответа делаем кнопку голубой (если не нажата)
            if (state.buttons.rightBtnState !== 'bluePushed') {
                state.buttons.rightBtnState = action.payload
                    ? 'blue'
                    : 'default';
            }
        },
        pushLeftButton(state) {
            state.buttons.leftBtnState = 'pushed';
            state.buttons.leftBtnClicked = true;
        },
        pushRightButton(state) {
            // Определяем какое состояние должно быть при нажатии
            state.buttons.rightBtnState =
                state.buttons.rightBtnState === 'blue'
                    ? 'bluePushed'
                    : 'pushed';
            state.buttons.rightBtnClicked = true;
        },
        resetButtonStates(state) {
            state.buttons.leftBtnState = 'default';
            state.buttons.leftBtnClicked = false;
            // После нажатия возвращаем кнопку в голубой или обычный state
            state.buttons.rightBtnState = state.buttons.selectedOption
                ? 'blue'
                : 'default';
            state.buttons.rightBtnClicked = false;
        },
        resetButtons(state) {
            state.buttons = initialState.buttons;
        },
    },
});

export const {
    setSelectedOption,
    pushLeftButton,
    pushRightButton,
    resetButtonStates,
    resetButtons,
} = uiSlice.actions;

export default uiSlice.reducer;
