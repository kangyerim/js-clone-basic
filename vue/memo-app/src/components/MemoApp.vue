/* 메모들의 상태를 관리 */
<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo"/>
    <ul class="memo-list">
      <memo v-for="(memo, i) in memos" :key="i" :memo="memo"
            @deleteMemo="deleteMemo" 
            @updateMemo="updateMemo" />
    </ul>
  </div>
</template>

<script>
import Memo from './Memo.vue';
import MemoForm from './MemoForm.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
})

export default {
  name: 'memo-app',
  components: { 
    Memo, MemoForm 
  },
  data : () => ({
    memos: [],
  }),
  methods: {
    ...mapActions(['fetchMemos']),
    addMemo(payload) {
      memoAPICore.post('/', payload)
      .then(res => { this.memos.push(res.data) })
    },
    storeMemo() {
      const memoToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memoToString)
    },
    deleteMemo(id) {
      const targetId = this.memos.findIndex(v => v.id === id);
      memoAPICore.delete(`/${id}`)
      .then(() => { this.memos.splice(targetId, 1) })      
    },
    updateMemo(payload) {
      const { id, content } = payload;
      const targetIdx = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIdx];
      memoAPICore.put(`/${id}`, { content })
      .then(() => { this.memos.splice(targetIdx, 1, { ...targetMemo, content }) })
    }
  },
  created() {
    this.fetchMemos();
  }
}
</script>

<style scope>
.memo-list{
  padding: 20px 0;
  margin: 0;
}
</style>