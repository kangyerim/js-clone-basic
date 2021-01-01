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
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components: {
        header: () => import('@/components/AppHeader'),
        default: () => import('@/pages/PostEditPage.vue'),
      },
      props: { default: true },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if(!isAuthorized) {
          alert('로그인이 필요합니다!');
          next({ name: 'Signin' });
          return false;
        }
        store.dispatch('fetchPost', to.params.postId)
        .then(res => {
          const post = store.state.post;
          const isAuthor = post.user.id === store.state.me.id;
          if(isAuthor) {
            next();
          } else {
            alert('게시글의 작성자만 게시물을 수정할 수 있습니다.');
            next(from);
          }
        })
        .catch(err => {
          alert(err.response.data.msg);
          next(from);
        })
      }
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
