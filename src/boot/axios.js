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

// import { boot } from "quasar/wrappers";
// import axios from "axios";
// import { SessionStorage } from "quasar";

// const baseUrl = "http://localhost:8000/";

// const api = axios.create({ baseURL: baseUrl });

// async function refreshToken(error) {
//   return new Promise((resolve, reject) => {
//     try {
//       const refreshToken = SessionStorage.getItem("refresh_token");
//       const header = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${refreshToken}`,
//       };
//       const parameters = {
//         method: "POST",
//         headers: header,
//       };
//       const body = {
//         grant_type: "refresh_token",
//         refreshToken,
//       };
//       axios
//         .post(baseUrl + "auth/refreshToken", body, parameters)
//         .then(async (res) => {
//           console.log(res.data);
//           SessionStorage.set("access_token", res.data.access_token);
//           return resolve(res);
//         })
//         .catch((err) => {
//           SessionStorage.remove("access_token");
//           SessionStorage.remove("refresh_token");
//           store.authenticated = false;
//           return reject(error);
//         });
//     } catch (err) {
//       return reject(err);
//     }
//   });
// }

// api.interceptors.request.use(
//   async (config) => {
//     const value = await SessionStorage.getItem("access_token");
//     config.headers = {
//       Authorization: `Bearer ${value}`,
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (res) => {
//     if (res.status === 403) {
//     }
//     return res;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await SessionStorage.remove("access_token");
//       const accessToken = await refreshToken();
//       axios.defaults.headers.common.Authorization = `${accessToken}`;
//       return api(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// export default boot(({ app, store }) => {
//   app.provide("axios", api);
//   store.use(() => ({ api }));
// });

// export { api };
