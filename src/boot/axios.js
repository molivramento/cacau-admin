import { boot } from "quasar/wrappers";
import axios from "axios";
import { SessionStorage } from "quasar";

const baseUrl = "http://localhost:8000/";

const api = axios.create({ baseURL: baseUrl });

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      const refreshToken = SessionStorage.getItem("refresh_token");
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      };
      const parameters = {
        method: "POST",
        headers: header,
      };
      const body = {
        grant_type: "refresh_token",
        refreshToken,
      };
      axios
        .post(baseUrl + "auth/refreshToken", body, parameters)
        .then(async (res) => {
          console.log(res.data);
          SessionStorage.set("access_token", res.data.access_token);
          return resolve(res);
        })
        .catch((err) => {
          SessionStorage.remove("access_token");
          SessionStorage.remove("refresh_token");
          store.authenticated = false;
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

api.interceptors.request.use(
  async (config) => {
    const value = await SessionStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${value}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    if (res.status === 403) {
    }
    return res;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await SessionStorage.remove("access_token");
      const accessToken = await refreshToken();
      axios.defaults.headers.common.Authorization = `${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default boot(({ app, store }) => {
  app.provide("axios", api);
  store.use(() => ({ api }));
});

export { api };

// import { boot } from 'quasar/wrappers'
// import axios from 'axios'

// // Be careful when using SSR for cross-request state pollution
// // due to creating a Singleton instance here;
// // If any client changes this (global) instance, it might be a
// // good idea to move this instance creation inside of the
// // "export default () => {}" function below (which runs individually
// // for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })

// export default boot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api

//   app.config.globalProperties.$axios = axios
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file

//   app.config.globalProperties.$api = api
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
// })

// export { api }
