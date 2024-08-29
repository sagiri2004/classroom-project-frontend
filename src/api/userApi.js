import apiClient from "./apiClient";
import { loginStart, loginError, loginSuccess } from "~/redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await apiClient.post("/login", user);
    dispatch(loginSuccess(response.data.data));
    navigate("/");
  } catch (error) {
    console.error("Login error:", error); // Thêm log lỗi để kiểm tra
    dispatch(loginError());
  }
};

export const registerUser = async (user, navigate) => {
  try {
    await apiClient.post("/register", user);
    navigate("/");
  } catch (error) {
    console.error("Register error:", error); // Thêm log lỗi để kiểm tra
  }
};
