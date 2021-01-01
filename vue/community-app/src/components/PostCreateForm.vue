<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <label>제목</label>
      <input v-model="title" type="text" placeholder="제목을 입력해 주세요." />
      <label>내용</label>
      <textarea v-model="contents" rows="5" placeholder="내용을 입력해 주세요"></textarea>
      <button type="submit">제출하기</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'post-create-form',
  data: () => ({
    title: '',
    contents: ''
  }),
  methods: {
    onSubmit() {
      const { title, contents } = this;
      this.$emit('submit', { title, contents });
    }
  }
}
</script>

<style>

</style>