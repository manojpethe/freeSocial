import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    fullName: "Chris Hemsworth",
    gender:"Male",
    religion:"Christian",
    motherTongue:"English",
    height:"6.2",
    annualIncome:"1000L",
    location:"Las Vegas",
    caste:"Cathlolic",
    managedBy:"Mother",
    criticalInfo:{
      maritalStatus: "Unmarried",
      birthDate: "01/01/1990"
    },
    aboutMe:"I am an Actor",
    family:"We are from Australia and based in las vegas for last 15 years due to career",
    education:"Bachelors",
    career:"I wish to continue with the current career"
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
      // console.log("Redux: updateData",action.payload);
      state.data = { ...state.data , ...action.payload}
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