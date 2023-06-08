<template>
  <q-item clickable @click="handleRouter(to)">
    <q-item-section v-if="icon" avatar>
      <q-icon v-if="$route.name == to" :name="icon" color="primary" />
      <q-icon v-else :name="icon" />
    </q-item-section>

    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const handleRouter = (to) => {
      router.push({ name: to });
    };

    return {
      handleRouter,
    };
  },
});
</script>
