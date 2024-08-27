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
    profile: {
      error: false,
      loading: false,
      currentProfile: null,
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
    getProfileStart: (state) => {
      state.profile.loading = true;
      state.profile.error = false;
    },
    getProfileSuccess: (state, action) => {
      state.profile.currentProfile = action.payload.data;
      state.profile.loading = false;
      state.profile.error = false;
    },
    getProfileError: (state) => {
      state.profile.loading = false;
      state.profile.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  getProfileError,
  getProfileStart,
  getProfileSuccess,
} = authSlice.actions;

export default authSlice.reducer;
