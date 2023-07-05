import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfo'

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice
  },
})