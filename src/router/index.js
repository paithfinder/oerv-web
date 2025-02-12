import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/index.vue")
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/board/index.vue")
    }
   
  ]
});

export default router;
