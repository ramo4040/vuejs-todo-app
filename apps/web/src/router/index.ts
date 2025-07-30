import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import RegisterPage from '@/pages/Register.vue'
import LoginPage from '@/pages/Login.vue'
import ForgotPasswordPage from '@/pages/ForgotPassword.vue'
import ResetPasswordPage from '@/pages/ResetPassword.vue'

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
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: ForgotPasswordPage,
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: ResetPasswordPage,
        },
      ],
    },
  ],
})

export default router
