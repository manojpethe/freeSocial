import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data:[],
}

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    loadData: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload
    },
    addData: (state) => {
      state.data = {}
    },
    clearSuggestions: (state) => {
      state.data = []
    },
    // incrementByAmount: (state, action) => {
    //   state.suggestions += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { loadData, addData, clearSuggestions } = suggestionsSlice.actions

export default suggestionsSlice.reducer