import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: () => import ('@/pages/PostListPage.vue')
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      component: () => import ('@/pages/PostViewPage.vue'),
      props:true,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import ('@/pages/Signup.vue')
    }
  ]
})
