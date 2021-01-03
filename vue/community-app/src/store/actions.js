import api from '@/api';
import { FETCH_POST_LIST, FETCH_POST, SET_ACCESS_TOKEN, 
  SET_MY_INFO,
  DELETE_ACCESS_TOKEN,
  DELETE_MY_INFO,
  UPDATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
 } from  './mutations-type';

export default {
  fetchPostList({ commit }) {
    return api.get('/posts')
      .then(res => { commit(FETCH_POST_LIST, res.data)})
  },
  fetchPost({ commit }, postId) {
    return api.get(`/posts/${postId}`)
      .then(res => { commit(FETCH_POST, res.data) });
  },
  signin({ commit }, payload) {
    const { email, password } = payload
      api.post(`/auth/signin`, { email, password })
      .then(res => {
        const { accessToken } = res.data;
        commit(SET_ACCESS_TOKEN, accessToken);
        return api.get(`/users/me`);
      })
      .then(res => {
        commit(SET_MY_INFO, res.data);
      })
  },
  signinByToken({ commit }, token) {
    commit(SET_ACCESS_TOKEN, token);
    return api.get(`/users/me`)
    .then(res => {
      commit(SET_MY_INFO, res.data);
    })
  },
  signout({ commit }) {
    commit(DELETE_ACCESS_TOKEN);
    commit(DELETE_MY_INFO);
  },
  createComment({ commit, state }, comment) {
    const postId = state.post.id;
    return api.post(`/posts/${postId}/comments`, { contents: comment })
    .then(res => {
      commit(UPDATE_COMMENT, res.data);
    })
  },
  editComment({ commit, state }, { commentId, comment}) {
    const postId = state.post.id;
    return api.put(`/posts/${postId}/comments/${commentId}`, {
      contents: comment })
      .then(res => {
        commit(EDIT_COMMENT, res.data);
      })
  },
  deleteComment({ commit, state }, commentId) {
    const postId = state.post.id;
    return api.delete(`/posts/${postId}/comments/${commentId}`)
    .then(res => {
      commit(DELETE_COMMENT, commentId);
    })
  }
}