import { ref } from "vue";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";

const user = ref(null);

export default function useAuth() {
  const store = useAuthStore();

  const login = async (data) => {
    await api
      .post("auth/token", { email: data.email, password: data.password })
      .then((res) => {
        SessionStorage.set("access_token", res.data.access_token);
        SessionStorage.set("refresh_token", res.data.refresh_token);
        store.authenticated = true;
      })
      .catch((error) => {
        return error.message;
      });
  };

  const isLoggedIn = () => {
    if (SessionStorage.has("access_token")) {
      store.authenticated = true;
    }
    return store.authenticated;
  };

  const logout = () => {
    SessionStorage.remove("access_token");
    SessionStorage.remove("refresh_token");
    store.authenticated = false;
  };

  const me = async () => {
    await api
      .get("auth/me")
      .then((res) => {
        user.value = res.data;
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  return {
    me,
    user,
    login,
    isLoggedIn,
    logout,
  };
}
