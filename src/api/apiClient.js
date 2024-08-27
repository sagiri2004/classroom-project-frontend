import axios from "axios";
import store from "~/redux/store"; // Đảm bảo bạn đã export store trong file store.js của bạn

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
    const token = state.auth.login.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
