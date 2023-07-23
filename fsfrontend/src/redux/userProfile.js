import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    fullName: "Chris Hemsworth",
    religion:"Christian",
    motherTongue:"English",
    height:"6.2",
    annualIncome:"1000L",
    location:"Las Vegas",
    caste:"Cathlolic",
    managedBy:"Mother"
  },
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateData: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = {...action.payload}
    },
    clearData: (state) => {
      state.data = {}
    },
    // incrementByAmount: (state, action) => {
    //   state.userInfo += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateData, clearData } = userProfileSlice.actions

export default userProfileSlice.reducer