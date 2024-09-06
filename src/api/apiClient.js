import axios from "axios";
import { store } from "~/redux/store";
import { logoutUser, refreshToken } from "~/redux/authSlice"; // Import async thunks cho logout và refresh token

const apiClient = axios.create({
  baseURL: "http://localhost:6969/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
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
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 403) {
        console.log("Request failed with status code 403, please login again");

        store.dispatch(logoutUser());
        window.location.href = "/login";
        return Promise.reject(error);
      } 
      
      else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu để ngăn chặn vòng lặp vô hạn
        console.log("Request failed with status code 401, refreshing token...");

        try {
          const refreshResponse = await store.dispatch(refreshToken());

          if (refreshResponse.payload?.accessToken) {
            const newAccessToken = refreshResponse.payload.accessToken;
            console.log("New access token:", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);

          store.dispatch(logoutUser());
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
