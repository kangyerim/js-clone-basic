<template>
  <div class="sign-up-page">
    <h3>회원가입</h3>
    <signup-form @submit="onSubmit"/>
    <p>이미 가입했나요?<router-link :to="{ name: 'Signin' }">로그인</router-link></p>
  </div>
</template>

<script>
import api from '@/api';
import SignupForm from '@/components/SignupForm.vue';

export default {
  name: 'sign-up',
  components: { SignupForm },
  methods: {
    onSubmit(payload) {
      const { name, email, password } = payload
      api.post(`/auth/signup`, { name, email, password })
      .then(res => {
        alert('회원가입이 완료 되었습니다!');
        this.$router.push({ name: 'Signin'});
      })
      .catch(err => {
        alert(err.respose.data.msg);
      })
    }
  }
}
</script>

<style>

</style>