import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      components: {
        header: () => import('@/components/AppHeader'),
        default: () => import ('@/pages/PostListPage.vue'),
      },
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        header: () => import('@/components/AppHeader'),
        default: () => import('@/pages/PostViewPage.vue'),
      },
      props: { default: true },
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: () => import('@/components/AppHeader'),
        default: () => import('@/pages/Signup'),
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        header: () => import('@/components/AppHeader'),
        default: () => import('@/pages/Signin.vue'),
      },
    }
  ]
})
