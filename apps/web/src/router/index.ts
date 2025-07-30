import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { Register, Login, ForgotPassword, ResetPassword } from '@/pages/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'auth/register',
          name: 'Register',
          component: Register,
        },
        {
          path: 'auth/login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'auth/forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword,
        },
        {
          path: 'auth/reset-password',
          name: 'ResetPassword',
          component: ResetPassword,
        },
        // Redirect old routes to new auth routes
        {
          path: 'register',
          redirect: '/auth/register',
        },
        {
          path: 'login',
          redirect: '/auth/login',
        },
        {
          path: 'forgot-password',
          redirect: '/auth/forgot-password',
        },
        {
          path: 'reset-password',
          redirect: '/auth/reset-password',
        },
      ],
    },
  ],
})

export default router
