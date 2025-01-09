import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/board/:id',
      name: 'board',
      component: () => import('../views/board/index.vue')
    }
  ]
})

export default router
