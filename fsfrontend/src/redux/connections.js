import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data:[],
}

export const connectionsSlice = createSlice({
  name: 'connections',
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
    // incrementByAmount: (state, action) => {
    //   state.connections += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { loadData, addData } = connectionsSlice.actions

export default connectionsSlice.reducer