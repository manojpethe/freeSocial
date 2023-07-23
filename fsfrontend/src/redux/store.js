import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfo'
import userProfileSlice from './userProfile'

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    userProfile: userProfileSlice,
  },
})