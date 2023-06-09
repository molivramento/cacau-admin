import { ref } from "vue";
import { defineStore } from "pinia";
import { useFetch } from "@vueuse/core";

export const useCategoryStore = defineStore("category", () => {
  const url = ref(`http://localhost:8000/categories/`);
  const { data } = useFetch(url.value, { refetch: true }).get().json();
  return {
    url,
    data,
  };
});
