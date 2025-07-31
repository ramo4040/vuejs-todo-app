import { createRouter, createWebHistory } from 'vue-router'
import { AuthLayout, DashboardLayout } from '@/layouts'
import {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  DashboardPage,
  NotificationsPage,
} from '@/pages'
import { useAuthStore } from '@/entities/auth'
import { tokenManager } from '@/shared/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
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
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: DashboardPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/dashboard/notifications',
          name: 'DashboardNotifications',
          component: NotificationsPage,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const token = tokenManager.get()

  if (!auth.user && token) {
    await auth.getUser()
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
