import apiClient from "./apiClient";
import {
  loginStart,
  loginError,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutError,
} from "~/redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await apiClient.post("/auth/login", user);
    dispatch(loginSuccess(response.data.data));
    navigate("/");
  } catch (error) {
    console.error("Login error:", error); // Thêm log lỗi để kiểm tra
    dispatch(loginError());
  }
};

export const registerUser = async (user, navigate) => {
  try {
    const response = await apiClient.post("/auth/register", user);
    console.log(response);
    navigate("/");
  } catch (error) {
    console.error("Register error:", error); // Thêm log lỗi để kiểm tra
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await apiClient.post("/auth/logout");
    dispatch(logoutSuccess());
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error); // Thêm log lỗi để kiểm tra
    dispatch(logoutError());
  }
};
