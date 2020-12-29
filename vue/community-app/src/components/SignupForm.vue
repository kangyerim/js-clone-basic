<template>
  <form novalidate>
    <fieldset>
      <input v-model="name" placeholder="이름을 입력해주세요." type="text" />
      <input v-model="email" placeholder="이메일을 입력해주세요." type="email" />
      <input v-model="password" placeholder="비밀번호를 입력해주세요." type="password" />
      <input v-model="passwordConfirm" placeholder="비밀번호를 다시 입력해주세요." type="password" />
      <button type="submit">회원가입</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'sign-up-form',
  data: () => ({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
}
</script>

<style>

</style>