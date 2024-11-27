import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: () => import('../views/layout/components/HomePage.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/layout/components/HomeView.vue')
        },
        {
          path: 'demands',
          name: 'demands',
          component: () => import('../views/layout/components/DemandsView.vue')
        },
        {
          path: 'demand/:id',
          name: 'demand-detail',
          component: () => import('../views/layout/components/DemandDetailView.vue')
        },
        {
          path: 'announcements',
          name: 'announcements',
          component: () => import('../views/layout/components/AnnouncementsView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/layout/components/AboutView.vue')

        },
        {
          path: 'user-center',
          component: () => import('../views/layout/components/UserCenterView.vue'),
          children: [
            {
              path: '',
              name: 'user-center',
              redirect: { name: 'profile' }
            },
            {
              path: 'profile/:userId?',
              name: 'profile',
              component: () => import('../views/layout/components/ProfileView.vue'),
              props: true
            },
            {
              path: ':userId?/published',
              name: 'published-demands',
              component: () => import('../views/layout/components/PublishedDemands.vue'),
              props: true
            },
            {
              path: ':userId?/following',
              name: 'followed-demands',
              component: () => import('../views/layout/components/FollowedDemands.vue'),
              props: true
            },
            {
              path: ':userId?/followed-users',
              name: 'followed-users',
              component: () => import('../views/layout/components/FollowedUsersView.vue'),
              props: true
            }
          ]
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('../views/layout/components/Community.vue'),
          children: [
            // {
            //   path: 'developers',
            //   name: 'developers',
            //   component: () => import('../views/layout/components/Developers.vue')
            // },
            {
              path: 'receivedReplies',
              name: 'received-replies',
              component: () => import('../views/layout/components/Replies.vue')
            },
            {
              path: 'devList',
              name: 'developers',
              component: () => import('@/components/DevList.vue')
            }

          ]
        }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token
  console.log('token', token)
  if (to.meta.requiresAuth && !token) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'login' && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
