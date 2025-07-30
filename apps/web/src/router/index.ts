import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { Register, Login, ForgotPassword, ResetPassword, DashboardPage } from '@/pages'
import { useAuthStore } from '@/entities/auth'
import { tokenManager } from '@/shared/api'

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
      ],
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const token = tokenManager.get()

  if (!auth.user && token) {
    const test = await auth.getUser()
    console.log('Fetched user:', test)
  }

  if (auth.user && to.path.startsWith('/auth')) {
    next({ name: 'Dashboard' })
    return
  }

  if (to.meta.requiresAuth && !auth.user) {
    next({ name: 'Login' })
    return
  }

  next()
})

export default router
