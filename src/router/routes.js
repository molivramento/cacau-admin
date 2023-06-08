const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/app/DashboardPage.vue"),
      },
      {
        path: "category/:slug*",
        name: "category",
        component: () => import("pages/category/CategoryPage.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
