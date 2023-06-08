<template>
  <div>
    <q-table :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Root" @click="handleBreadcrumb(null)" />
          <q-breadcrumbs-el
            v-for="slug in $route.params.slug"
            :key="slug"
            :label="slug"
            @click="handleBreadcrumb(slug)"
          />
        </q-breadcrumbs>
        <q-space />
        <q-btn
          round
          color="primary"
          icon="mdi-plus"
          @click="store.addingCategory = true"
        />
        {{ store.addingCategory }}
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props" @click="handleNext(props.row.slug)">
            {{ props.row.name }}
          </q-td>
          <q-td
            key="description"
            :props="props"
            @click="handleNext(props.row.slug)"
          >
            {{ props.row.description }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="primary"
              size="sm"
              icon="edit"
              @click="() => handleEdit(props.row)"
            />
            <q-btn
              color="negative"
              size="sm"
              icon="delete"
              @click="() => handleDelete(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <div>
    <AddCategoryDialog />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useCategoryStore } from "src/stores/category/categoryStore";
import AddCategoryDialog from "src/components/category/addCategoryDialog.vue";

export default defineComponent({
  name: "ListCategory",

  components: { AddCategoryDialog },

  props: {
    data: {
      type: Array,
    },
  },

  setup(props) {
    const router = useRouter();

    const route = useRoute();

    const store = useCategoryStore();

    const rows = computed(() => props.data);

    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "description",
        align: "left",
        label: "Description",
        field: "description",
        sortable: true,
      },

      { name: "actions", align: "center", label: "Actions", field: "actions" },
    ];

    const handleBreadcrumb = async (slug) => {
      if (slug == null) {
        store.categorySlug = [];
        router.push({ name: "category" });
        return;
      }
      store.categorySlug.splice(
        store.categorySlug.indexOf(slug) + 1,
        store.categorySlug.length
      );
      rows.value = await [];
      router.push({ name: "category", params: { slug: store.categorySlug } });
    };

    const handleNext = async (slug) => {
      store.categorySlug.push(slug);
      rows.value = await [];
      router.push({ name: "category", params: { slug: store.categorySlug } });
    };

    return {
      rows,
      columns,
      handleNext,
      handleBreadcrumb,
      store,
    };
  },
});
</script>
