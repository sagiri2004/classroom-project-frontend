import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "~/api/apiClient";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", user);
      return response.data.data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", user);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/refresh-token");
      return response.data.data;
    } catch (error) {
      console.error("Refresh token error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      accessToken: null,
      error: null,
      loading: false,
    },
    logout: {
      error: null,
      loading: false,
    },
    register: {
      error: null,
      loading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.accessToken = action.payload.accessToken;
        state.login.currentUser = action.payload.user;
        state.login.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || "Login failed";
      })

      // Đăng xuất
      .addCase(logoutUser.pending, (state) => {
        state.logout.loading = true;
        state.logout.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logout.loading = false;
        state.login.currentUser = null;
        state.login.accessToken = null;
        state.logout.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logout.loading = false;
        state.logout.error = action.payload || "Logout failed";
      })

      // Đăng ký
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.register.loading = false;
        state.register.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload || "Registration failed";
      });
  },
});

export default authSlice.reducer;
