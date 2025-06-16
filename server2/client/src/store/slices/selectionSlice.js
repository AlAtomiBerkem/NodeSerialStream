import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    model: null,
    color: null,
};

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        setModel: (state, action) => {
            state.model = action.payload;
            console.log('Модель сохранена в Redux:', action.payload);
        },
        setColor: (state, action) => {
            state.color = action.payload;
            console.log('Цвет сохранен в Redux:', action.payload);
        },
        resetSelection: () => {
            console.log('Сброс выбора');
            return initialState;
        },
    },
});

export const { setModel, setColor, resetSelection } = selectionSlice.actions;

export const selectCombinedSelection = (state) => {
    const combined =
        state.selection.model && state.selection.color
            ? [state.selection.model, state.selection.color]
            : null;
    console.log('Текущий комбинированный выбор:', combined);
    return combined;
};

export default selectionSlice.reducer;
