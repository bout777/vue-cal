import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      component: () => import('../views/layout/HomePage.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'demands',
          name: 'demands',
          component: () => import('../views/DemandsView.vue')
        },
        {
          path: 'demand/:id',
          name: 'demand-detail',
          component: () => import('../views/DemandDetailView.vue')
        },
        {
          path: 'announcements',
          name: 'announcements',
          component: () => import('../views/AnnouncementsView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('token')

  if (to.meta.requiresAuth && !hasToken) {
    next('/login')
  } else {
    next()
  }
})

export default router
