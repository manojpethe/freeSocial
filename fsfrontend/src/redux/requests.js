import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data:[],
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    loadRequests: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload
    },
    addData: (state) => {
      state.data = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadRequests, addData } = requestsSlice.actions

export default requestsSlice.reducer