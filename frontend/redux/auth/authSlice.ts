// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '@/lib/types';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = !!action.payload;
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
