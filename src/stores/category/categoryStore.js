import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categorySlug = ref([]);

  const data = ref([]);

  const parentCategory = ref([]);

  const openDialog = ref(false);

  const openUpdateDialog = ref(false);

  const updatingCategory = ref({
    id: "",
    name: "",
    slug: "",
    keywords: "",
    description: "",
    parent: null,
  });

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

  const create = async (data) => {
    return await api
      .post("categories/", data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.message;
      });
  };

  const update = async (data) => {
    console.log(data);
    return await api
      .put("categories/", data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error.message;
      });
  };

  return {
    getAll,
    create,
    update,
    categorySlug,
    openDialog,
    data,
    parentCategory,
    updatingCategory,
    openUpdateDialog,
  };
});
