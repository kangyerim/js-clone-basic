import {FETCH_POST_LIST} from '@/store/mutations-type';

export default {
  [FETCH_POST_LIST] (state, posts) {
    state.posts = posts
  }
}