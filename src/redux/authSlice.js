import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      accessToken: null,
      error: false,
      loading: false,
    },
    logout: {
      error: false,
      loading: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true;
      state.login.error = false;
    },

    loginSuccess: (state, action) => {
      state.login.accessToken = action.payload.accessToken;
      state.login.currentUser = action.payload.user;
      state.login.loading = false;
      state.login.error = false;
    },

    loginError: (state) => {
      state.login.loading = false;
      state.login.error = true;
    },

    logoutStart: (state) => {
      state.logout.loading = true;
      state.logout.error = false;
    },

    logoutSuccess: (state) => {
      state.logout.loading = false;
      state.logout.error = false;
      state.login.currentUser = null;
      state.login.accessToken = null;
    },

    logoutError: (state) => {
      state.logout.loading = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  logoutStart,
  logoutSuccess,
  logoutError,
} = authSlice.actions;

export default authSlice.reducer;
