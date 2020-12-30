import api from '@/api';
import cookie from 'js-cookie';
import {FETCH_POST_LIST, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO} from '@/store/mutations-type';

export default {
  [FETCH_POST_LIST] (state, posts) {
    state.posts = posts;
  },
  [FETCH_POST] (state, post) {
    state.post = post;
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    if(accessToken) {
      state.accessToken = accessToken;
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      cookie.set('accessToken', accessToken);
    }
  },
  [SET_MY_INFO](state, me) {
    state.me = me;
  }
}