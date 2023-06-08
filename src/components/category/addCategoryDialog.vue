<template>
  <q-dialog v-model="store.addingCategory" persistent>
    <q-card>
      <q-card-section class="col items-center" style="width: 500px">
        {{ $route.params.slug }}
        <q-input v-model="payload.name" type="text" label="Categoria" />
        <q-input v-model="payload.slug" type="text" label="Slug" />
        <q-editor v-model="payload.description" min-height="5rem" />
        <q-input
          v-model="payload.keywords"
          type="text"
          label="Keywords (exemplo: keyword1,keyword2,keyword3)"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Salvar" color="primary" v-close-popup onSubmit />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useCategoryStore } from "src/stores/category/categoryStore";

export default defineComponent({
  name: "AddCategoryDialog",

  setup() {
    const store = useCategoryStore();

    const confirm = store.addingCategory;

    const payload = ref({
      name: "",
      slug: "",
      keywords: "",
      parent: "",
      description: "",
    });

    watch(
      () => store.addingCategory,
      (newVal) => {
        if (newVal) {
          store.addingCategory = true;
        }
      }
    );

    return {
      store,
      confirm,
      payload,
    };
  },
});
</script>
