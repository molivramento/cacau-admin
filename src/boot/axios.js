import axios from "axios";
import { SessionStorage } from "quasar";

const baseUrl = "http://localhost:8000/";

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use((config) => {
  const accessToken = SessionStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(baseUrl + "auth/refresh", {
          headers: {
            Authorization: `Bearer ${SessionStorage.getItem("refresh_token")}`,
          },
        });

        (api.defaults.headers.common.Authorization = `Bearer ${SessionStorage.getItem(
          "access_token"
        )}`),
          api(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
