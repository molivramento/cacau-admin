<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section> </q-card-section>
      <q-card-section>
        <div class="text-h6">Login - Cacau Store</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <div class="q-py-md">
            <q-input v-model="data.email" type="text" label="Email" />
            <q-input v-model="data.password" type="password" label="Password" />
          </div>
          <div class="q-gutter-md">
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "src/composables/useAuth";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const data = ref({
      email: "admin@gmail.com",
      password: "string",
    });

    const msg = ref("");

    const { login } = useAuth();

    const router = useRouter();

    const handleLogin = async () => {
      try {
        await login(data.value);
        router.push({ name: "dashboard" });
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      data,
      handleLogin,
    };
  },
});
</script>
