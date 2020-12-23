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
import { mapState, mapActions } from 'vuex';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
})

export default {
  name: 'memo-app',
  components: { 
    Memo, MemoForm 
  },
  computed: {
    ...mapState(['memos'])
  },
  methods: {
    ...mapActions(['fetchMemos', 'addMemo', 'deleteMemo', 'updateMemo']),
    storeMemo() {
      const memoToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memoToString)
    },
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