import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [
    {profileId:"ABC123",img:"/src/assets/img/merlyn.jpg",age:28,height:5.10,location:"San Francisco"},
    {profileId:"XYZ123",img:"/src/assets/img/kathrine.jpg",age:30,height:5.5,location:"New York"},
    {profileId:"LMN123",img:"/src/assets/img/alexandra.jpg",age:35,height:5.4,location:"Orlando"},
    {profileId:"OPQ123",img:"/src/assets/img/moon.png",age:31,height:5.8,location:"Paris"},
  ],
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
      state.data = {...action.payload}
    },
    addData: (state) => {
      state.data = {}
    },
    // incrementByAmount: (state, action) => {
    //   state.suggestions += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = suggestionsSlice.actions

export default suggestionsSlice.reducer