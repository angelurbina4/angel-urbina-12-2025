import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/features/pokedex/views/HomeView.vue"),
  },
  {
    path: "/team",
    name: "team",
    component: () => import("@/features/team/views/TeamView.vue"),
  },
  {
    path: "/team/:id",
    name: "team-detail",
    component: () => import("@/features/team/views/TeamDetailView.vue"),
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
