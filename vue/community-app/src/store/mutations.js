import {FETCH_POST_LIST, FETCH_POST} from '@/store/mutations-type';

export default {
  [FETCH_POST_LIST] (state, posts) {
    state.posts = posts;
  },
  [FETCH_POST] (state, post) {
    state.post = post;
  }
}