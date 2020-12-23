<template>
  <div class="app-header">
    <h1>메모 애플리케이션</h1>
    <p><strong>{{ getMemoCount }}</strong></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name : 'app-header',
  computed: {
    ...mapGetters(['getMemoCount'])
  }
}
</script>

<style scoped>
.app-header {
  overflow: hidden;
  padding: 52px 0 27px;
}
.app-header h1 {
  float: left;
  font-size: 24px;
  text-align: center;
}
.app-header p strong {
  color: #ff5a00;
}
</style>>
