/* 각각의 메모의 상태를 표현 */
<template>
  <li class="memo-item">
    <strong>{{memo.title}}</strong>
    <p @dblclick="handleDbClick">
      <template v-if="!isEditing">{{memo.content}}</template>
      <input v-else type="text" ref="content" 
              :value="memo.content"
              @keydown.enter="updateMemo"
              @blur="handleBlur">
    </p>
    <button @click="deleteMemo" type="button"><i class="fas fa-times"></i></button>
  </li>
</template>

<script>
export default {
  name : 'memo',
  props: {
    memo: {
      type: Object
    }
  },
  data: () => ({
    isEditing: false,
  }),
  methods: {
    deleteMemo() {
      const id = this.memo.id;
      this.$emit('deleteMemo', id);
    },
    handleDbClick() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.content.focus();
      });
    },
    updateMemo(event) {
      const id = this.memo.id;
      const content = event.target.value.trim();
      if (content.length <= 0) {
        return alert('메모의 내용을 입력해주세요.')
      }
      this.$emit('updateMemo', { id, content });
      this.isEditing = false;
    },
    handleBlur() {
      this.isEditing = false;
    }
  },
  beforeUpdate() {
    console.log("before update", this.$refs.content);
  },
  updated() {
    console.log("updated", this.$refs.content);
  }
}
</script>

<style scope>
.memo-item{
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: 24px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  list-style: none;
}
.memo-item button{
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: #e5e5e5;
  border: 0;
}
.memo-item strong{
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: normal;
  word-break: break-all;
}
.memo-item p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}
.memo-item p input[type="text"]{
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  border: 1px solid #999;
}
</style>