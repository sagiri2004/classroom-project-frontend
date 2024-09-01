import axios from "axios";
import { store } from "~/redux/store"; // Đảm bảo bạn đã export store trong file store.js của bạn
import { logoutSuccess, loginSuccess } from "~/redux/authSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:6969/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // Truy cập state từ store trực tiếp
    const state = store.getState();
    const token = state?.auth?.login.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      console.log("Request failed with status code 403, please login again");
      store.dispatch(logoutSuccess());
      window.location.href = "/login";
    } else if (error.response && error.response.status === 401) {
      console.log("Request failed with status code 401, refreshing token...");
      try {
        const response = await apiClient.get("/auth/refresh-token");
        const { accessToken } = response.data.data;
        console.log("New access token:", accessToken);
        store.dispatch(loginSuccess({ accessToken }));
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        store.dispatch(logoutSuccess());
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
