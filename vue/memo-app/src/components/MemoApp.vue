/* 메모들의 상태를 관리 */
<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo"/>
    <memo />
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
    }
  },
  created() {
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : []
  }
}
</script>

<style>

</style>