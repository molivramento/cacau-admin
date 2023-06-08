import { api } from "src/boot/axios";

export default function useCategory() {
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
  };
}
