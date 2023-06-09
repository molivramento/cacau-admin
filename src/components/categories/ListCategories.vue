<template>
  <div>
    {{ store.data }}
    <div v-for="category in store.data" :key="category.id">
      <q-card class="q-my-md">
        <q-card-section class="row" v-if="category.parent === null">
          <div class="col-9 row" @click="console.log('click')">
            <div class="text-h6">{{ category.name }}</div>
            <q-separator spaced vertical />
            <div class="text-h6">{{ category.slug }}</div>
          </div>
          <div class="col-3">
            <q-btn
              color="primary"
              label="Edit"
              icon="edit"
              @click="store.edit(category.id)"
            />
            <q-btn
              color="negative"
              label="Delete"
              icon="delete"
              @click="store.delete(category.id)"
            />
          </div>
          {{ category }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useCategoryStore } from "src/stores/categories/CategoryStore";

export default defineComponent({
  name: "ListCategories",

  data() {
    const store = useCategoryStore();

    return {
      store,
    };
  },
});
</script>
