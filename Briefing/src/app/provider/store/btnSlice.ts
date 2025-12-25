import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ButtonId = string

interface ButtonState {
  activeButton: ButtonId | null
  buttonStates: Record<ButtonId, boolean>
}

const initialState: ButtonState = {
  activeButton: null,
  buttonStates: {}
}

const buttonSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    activateButton: (state, action: PayloadAction<ButtonId>) => {
      const buttonId = action.payload

      Object.keys(state.buttonStates).forEach(key => {
        state.buttonStates[key] = false
      })

      state.activeButton = buttonId
      state.buttonStates[buttonId] = true

    },

    deactivateButton: (state, action: PayloadAction<ButtonId>) => {
      const buttonId = action.payload

      state.buttonStates[buttonId] = false

      if (state.activeButton === buttonId) {
        state.activeButton = null
      }

    },

    resetAllButtons: (state) => {
      state.activeButton = null
      state.buttonStates = {}
    }
  }
})

export const {
  activateButton,
  deactivateButton,
  resetAllButtons
} = buttonSlice.actions

export default buttonSlice.reducer
