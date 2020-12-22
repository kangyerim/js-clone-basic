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

export default {
  name: 'memo-app',
  components: { 
    Memo, MemoForm 
  },
  data : () => ({
    memos: [],
  }),
  methods: {
    addMemo(payload) {
      this.memos.push(payload);
      this.storeMemo();
    },
    storeMemo() {
      const memoToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memoToString)
    },
    deleteMemo(id) {
      const targetId = this.memos.findIndex(v => v.id === id);
      this.memos.splice(targetId, 1);
      this.storeMemo();
    },
    updateMemo(payload) {
      const { id, content } = payload;
      const targetIdx = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIdx];
      this.memos.splice(targetIdx, 1, { ...targetMemo, content });
      this.storeMemo();
    }
  },
  created() {
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : []
  }
}
</script>

<style scope>
.memo-list{
  padding: 20px 0;
  margin: 0;
}
</style>