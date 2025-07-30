import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import RegisterPage from '@/pages/Register.vue'
import LoginPage from '@/pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'register',
          name: 'Register',
          component: RegisterPage,
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginPage,
        },
      ],
    },
  ],
})

export default router
