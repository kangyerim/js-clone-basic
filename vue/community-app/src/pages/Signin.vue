<template>
  <div class="sign-in-page">
    <h3>로그인</h3>
    <signin-form @submit="onSubmit"/>
    <p>회원이 아닌가요?<router-link :to="{ name: 'Signup' }">회원가입</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SigninForm from '@/components/SigninForm.vue';

export default {
  name: 'sign-in',
  components: {
    SigninForm
  },
  methods: {
    ...mapActions(['signin']),
    onSubmit(payload) {
      this.signin(payload)
      .then(res => {
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
