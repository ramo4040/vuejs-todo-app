import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/pages/Register.vue'
import LoginPage from '@/pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ],
})

export default router
