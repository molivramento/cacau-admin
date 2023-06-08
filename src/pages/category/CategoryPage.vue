<template>
  <div>
    <ListCategory />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import ListCategory from "src/components/category/listCategories.vue";
import { useCategoryStore } from "src/stores/category/categoryStore";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CategoryViewPage",

  components: { ListCategory },

  setup() {
    const store = useCategoryStore();

    const route = useRoute();

    onBeforeMount(async () => {
      await fetchData(null);
    });

    watch(
      () => route.params.slug,
      async (newSlug) => {
        if (newSlug == null) {
          store.categorySlug = [];
          await fetchData(null);
        }
        await fetchData(newSlug);
      }
    );

    const fetchData = async (slug) => {
      if (slug == null) {
        store.data = await store.getAll("parent__isnull=true");
      } else {
        store.parentCategory = await store.getAll(
          "slug=" + slug[slug.length - 1]
        );
        store.data = await store.getAll("parent__slug=" + slug);
      }
    };

    return {
      store,
    };
  },
});
</script>
