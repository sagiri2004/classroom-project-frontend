import apiClient from "./apiClient";
import {
  loginStart,
  loginError,
  loginSuccess,
  getProfileStart,
  getProfileSuccess,
  getProfileError,
} from "~/redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await apiClient.post("/login", user);
    dispatch(loginSuccess(response.data.data));
    navigate("/profile");
  } catch (error) {
    console.error("Login error:", error); // Thêm log lỗi để kiểm tra
    dispatch(loginError());
  }
};
export const getUserProfile = (dispatch) => {
  dispatch(getProfileStart());
  apiClient
    .get("/profile",{
    })
    .then((response) => {
      dispatch(getProfileSuccess(response.data));
    })
    .catch((error) => {
      console.error("Get profile error:", error); // Thêm log lỗi để kiểm tra
      dispatch(getProfileError());
    });
};
