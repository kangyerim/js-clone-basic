/* 메모들의 상태를 관리 */
<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo"/>
    <ul class="memo-list">
      <memo v-for="(memo, i) in memos" :key="i"
            :memo="memo"
            :editingId="editingId"
            @deleteMemo="deleteMemo" 
            @updateMemo="updateMemo"
            @setEditingId="SET_EDITING_ID"
            @resetEditingId="RESET_EDITING_ID"/>
    </ul>
  </div>
</template>

<script>
import Memo from './Memo.vue';
import MemoForm from './MemoForm.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { SET_EDITING_ID, RESET_EDITING_ID } from "../store/mutations-types";

export default {
  name: 'memo-app',
  components: { 
    Memo, MemoForm 
  },
  computed: {
    ...mapState(['memos', 'editingId'])
  },
  methods: {
    ...mapMutations([SET_EDITING_ID, RESET_EDITING_ID]),
    ...mapActions(['fetchMemos', 'addMemo', 'deleteMemo', 'updateMemo']),
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