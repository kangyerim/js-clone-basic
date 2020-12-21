/* 메모들의 상태를 관리 */
<template>
  <div class="memo-app">
    <memo-form />
    <memo />
  </div>
</template>

<script>
import Memo from './Memo.vue';
import MemoForm from './MemoForm.vue';

export default {
  name: 'memo-app',
  components: { Memo, MemoFormMemoFormMemo },
  data : () => ({
    memos: [],
  }),
  created() {
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : []
  }
}
</script>

<style>

</style>