import axios from "axios";
import { SessionStorage } from "quasar";
import { decodeJwt } from "jose";

const baseUrl = "http://localhost:8000/";

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use((config) => {
  const accessToken = SessionStorage.getItem("access_token");
  // console.log(decodeJwt(accessToken).exp);
  // console.log(decodeJwt(accessToken).exp > Date.now() / 1000);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = SessionStorage.getItem("refresh_token");
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          baseUrl + "auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = refreshResponse.data.access_token;
        SessionStorage.set("access_token", newAccessToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (error) {
        SessionStorage.remove("access_token");
        SessionStorage.remove("refresh_token");
        quasar.router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export { api };
