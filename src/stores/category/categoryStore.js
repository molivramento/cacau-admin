import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categorySlug = ref([]);

  const addingCategory = ref(false);

  const getAll = async (filter) => {
    return await api
      .get(`categories/?${filter}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.message;
      });
  };

  return {
    getAll,
    categorySlug,
    addingCategory,
  };
});
