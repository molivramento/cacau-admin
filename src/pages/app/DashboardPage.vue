<template>
  <div>
    <q-btn color="primary" icon="check" label="OK" @click="getMe()" />
    {{ me }}
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "DashboardPage",

  setup() {
    const me = ref(null);

    const getMe = async () => {
      try {
        me.value = await api.get("/auth/me/");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      me,
      getMe,
    };
  },
});
</script>
