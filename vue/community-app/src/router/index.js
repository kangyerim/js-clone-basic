import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

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
      path: '/post/create',
      name: 'PostCreatePage',
      components: {
        header: () => import('@/components/Appheader'),
        default: () => import('@/pages/PostCreatePage.vue'),
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if(!isAuthorized) {
          alert('로그인이 필요합니다!');
          next({ name: 'Signin' });
        }
        next();
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
    },
  ]
})
