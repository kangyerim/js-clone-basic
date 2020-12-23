import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO, EDIT_MEMO } from './mutations-types';

export default {
  [FETCH_MEMOS] (state, payload) {
    state.memos = payload;
  },
  [ADD_MEMO](state, payload) {
    state.memos.push(payload);
  },
  [DELETE_MEMO](state, id) {
    const targetId = state.memos.findIndex(v => v.id === id);
    state.memos.splice(targetId, 1); 
  },
  [EDIT_MEMO](state, payload) {
    const { id, content } = payload;
    const targetIdx = state.memos.findIndex(v => v.id === id);
    const targetMemo = state.memos[targetIdx];
    state.memos.splice(targetIdx, 1, { ...targetMemo, content });
  }
}