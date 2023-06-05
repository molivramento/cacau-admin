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
        user.value = res.data;
        store.authenticated = res.data;
      })
      .catch((error) => {
        return error.message;
      });
  };

  const isLoggedIn = () => {
    return !!store.authenticated;
  };

  return {
    user,
    login,
    isLoggedIn,
  };
}
