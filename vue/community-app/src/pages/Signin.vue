<template>
  <div class="sign-in-page">
    <h3>로그인</h3>
    <signin-form @submit="onSubmit"/>
    <p>회원이 아닌가요?<router-link :to="{ name: 'Signup' }">회원가입</router-link></p>
  </div>
</template>

<script>
import api from '@/api';
import SigninForm from '@/components/SigninForm.vue';

export default {
  name: 'sign-in',
  components: {
    SigninForm
  },
  methods: {
    onSubmit(payload) {
      const { email, password } = payload
      api.post(`/auth/signin`, { email, password })
      .then(res => {
        const { accessToken } = res.data;
        api.defaults.headers.common.Authorization = `Bearer${accessToken}`;
        alert('로그인이 완료 되었습니다.');
        this.$router.push({ name: 'PostListPage'});
      })
      .catch(err => {
        alert(err.resopnse.data.msg);
      })
    }
  }
}
</script>

<style>

</style>