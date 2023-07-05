import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = {...action.payload}
    },
    logout: (state) => {
      state.data = {}
    },
    // incrementByAmount: (state, action) => {
    //   state.userInfo += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userInfoSlice.actions

export default userInfoSlice.reducer