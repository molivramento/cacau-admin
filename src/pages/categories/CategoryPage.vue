<template>
  <div>
    <ListCategories />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useCategoryStore } from "src/stores/categories/CategoryStore";
import ListCategories from "/src/components/categories/ListCategories.vue";

export default defineComponent({
  name: "CategoryPage",

  components: { ListCategories },

  data() {
    const store = useCategoryStore();

    return {
      store,
    };
  },
});
</script>
