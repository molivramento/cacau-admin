<template>
  <q-dialog v-model="store.addingCategory" persistent>
    <q-card>
      <q-card-section class="col items-center" style="width: 500px">
        <div v-if="store.parentCategory && store.parentCategory[0]">
          <h5 class="q-ma-xs">
            Pai:
            {{ store.parentCategory[0].name }}
          </h5>
        </div>
        <q-input
          class="q-my-sm"
          v-model="payload.name"
          type="text"
          label="Categoria"
        />
        <q-input
          class="q-my-sm"
          v-model="payload.slug"
          type="text"
          label="Slug"
        />
        <q-editor
          class="q-my-sm"
          v-model="payload.description"
          min-height="5rem"
        />
        <q-input
          class="q-my-sm"
          v-model="payload.keywords"
          type="text"
          label="Keywords (exemplo: keyword1,keyword2,keyword3)"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          v-close-popup
          @click="handleCreateCategory()"
        />
      </q-card-actions>
      {{ payload.parent }}
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useCategoryStore } from "src/stores/category/categoryStore";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AddCategoryDialog",

  setup() {
    const store = useCategoryStore();

    const route = useRoute();

    const confirm = store.addingCategory;

    const payload = ref({
      name: "",
      slug: "",
      keywords: "",
      parent: null,
      description: "",
    });

    const handleCreateCategory = async () => {
      console.log(store.parentCategory[0].id);
      if (store.parentCategory[0].id) {
        payload.value.parent = { id: store.parentCategory[0].id };
      }
      store.data = await store.getAll(
        "parent__slug=" + route.params.slug[route.params.slug.length - 1]
      );
      try {
        await store.create(payload.value);
        store.addingCategory = false;
      } catch (error) {
        store.addingCategory = true;
      }
    };

    return {
      store,
      confirm,
      payload,
      handleCreateCategory,
    };
  },
});
</script>
