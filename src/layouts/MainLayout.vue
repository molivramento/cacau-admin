<template>
  <q-layout class="row q-ml-md" view="hhh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      @mouseleave="mini = true"
      @mouseenter="mini = false"
      :mini="mini"
      overlay="overlay"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <div class="col-10 q-pl-xl q-py-sm q-pr-sm">
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>

    <div class="col-2">
      <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
      <q-separator spaced inset vertical dark />
      <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onUpdated } from "vue";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const overlay = ref("true");
    const menu = ref([
      { title: "DASHBOARD", icon: "dashboard", to: "dashboard" },
      { title: "PDV", icon: "mdi-printer-pos", to: "pos" },
      { title: "CATEGORIAS", icon: "mdi-shape", to: "category" },
      { title: "OPÇÕES", icon: "mdi-hexagon-multiple-outline", to: "options" },
      { title: "PRODUTOS", icon: "mdi-cube", to: "products" },
      { title: "VENDAS", icon: "mdi-credit-card-check-outline", to: "orders" },
      { title: "CLIENTES", icon: "mdi-account-heart-outline", to: "customers" },
      { title: "FRETE", icon: "mdi-truck-fast-outline", to: "frontEnd" },
      { title: "FORNECEDOR", icon: "mdi-factory", to: "frontEnd" },
    ]);

    const leftDrawerOpen = ref(true);

    const mini = ref(true);

    onUpdated(() => {
      return (leftDrawerOpen.value = true);
    });

    return {
      essentialLinks: menu,
      leftDrawerOpen,
      overlay,
      mini,
    };
  },
});
</script>
