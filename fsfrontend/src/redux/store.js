import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './userInfo';
import userProfileSlice from './userProfile';
import suggestionsSlice from './suggestions';

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    userProfile: userProfileSlice,
    suggestions: suggestionsSlice,
  },
})