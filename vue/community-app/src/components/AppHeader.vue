<template>
  <div class="app-header">
    <h1>Community</h1>
    <div v-if="isAuthorized">
      <strong>
          <button @click="toggle">{{ me.name }}님 환영합니다!</button>
          <i v-if="!isActive" class="fas fa-sort-down"></i>
          <i v-else class="fas fa-sort-up"></i>
      </strong>
      <ul v-if="isActive">
        <li><button @click="onSignOut">로그아웃</button></li>
      </ul>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Signin'}">로그인</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'app-header',
  data: () => ({
    isActive: false,
  }),
  computed: {
    ...mapState(['me']),
    ...mapGetters(['isAuthorized']),
  },
  methods: {
    ...mapActions(['signout']),
    toggle() {
      this.isActive = !this.isActive;
    },
    onSignOut() {
      this.signout();
      this.$router.push({ name: 'PostListPage' });
    }
  }
}
</script>

<style>

</style>