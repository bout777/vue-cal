import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
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
              redirect: 'profile'
            },
            {
              path: 'profile',
              name: 'profile',
              component: () => import('../views/layout/components/ProfileView.vue')
            },
            {
              path: 'published',
              name: 'published-demands',
              component: () => import('../views/layout/components/PublishedDemands.vue')
            },
            {
              path: 'following',
              name: 'followed-demands',
              component: () => import('../views/layout/components/FollowedDemands.vue')
            },
            {
              path: 'followed-users',
              name: 'followed-users',
              component: () => import('../views/layout/components/FollowedUsersView.vue')
            }
          ]
        }

      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const hasToken = localStorage.getItem('token')

//   if (to.meta.requiresAuth && !hasToken) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
