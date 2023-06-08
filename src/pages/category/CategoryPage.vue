<template>
  <div>
    <ListCategory :data="data" />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import ListCategory from "src/components/category/listCategories.vue";
import { useCategoryStore } from "src/stores/category/categoryStore";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CategoryViewPage",

  components: { ListCategory },

  setup() {
    const store = useCategoryStore();

    const route = useRoute();

    const router = useRouter();

    const data = ref([]);

    onBeforeMount(async () => {
      await fetchData(null);
    });

    watch(
      () => route.params.slug,
      async (newSlug) => {
        await fetchData(newSlug);
      }
    );

    const fetchData = async (slug) => {
      if (slug == null) {
        data.value = await store.getAll("parent__isnull=true");
      } else {
        data.value = await store.getAll("parent__slug=" + slug);
      }
    };

    return {
      store,
      data,
    };
  },
});
</script>
