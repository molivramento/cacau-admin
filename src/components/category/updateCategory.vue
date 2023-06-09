<template>
  <q-dialog v-model="store.openUpdateDialog" persistent>
    <q-card>
      <q-card-section class="col items-center" style="width: 500px">
        Updating...
        <div v-if="store.parentCategory && store.parentCategory[0]">
          <h5 class="q-ma-xs">
            Pai:
            {{ store.parentCategory[0].name }}
          </h5>
        </div>
        <q-input
          class="q-my-sm"
          v-model="store.updatingCategory.name"
          type="text"
          label="Categoria"
        />
        <q-input
          class="q-my-sm"
          v-model="store.updatingCategory.slug"
          type="text"
          label="Slug"
        />
        <q-editor
          class="q-my-sm"
          v-model="store.updatingCategory.description"
          min-height="5rem"
        />
        <q-input
          class="q-my-sm"
          v-model="store.updatingCategory.keywords"
          type="text"
          label="Keywords (exemplo: keyword1,keyword2,keyword3)"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          v-close-popup
          @click="store.openUpdateDialog = false"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          v-close-popup
          @click="handleUpdateCategory()"
        />
      </q-card-actions>
      {{ store.updatingCategory.name }}
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useCategoryStore } from "src/stores/category/categoryStore";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "UpdateDialog",

  setup() {
    const store = useCategoryStore();

    const route = useRoute();

    const open = ref(false);

    const data = ref({
      id: "",
      name: "",
      slug: "",
      description: "",
      keywords: "",
      parent: "",
    });

    const handleUpdateCategory = async () => {
      await store.update(store.updatingCategory);
    };

    return {
      store,
      data,
      handleUpdateCategory,
    };
  },
});
</script>
