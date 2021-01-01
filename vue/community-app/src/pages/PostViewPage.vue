<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <router-link :to="{ name: 'PostEditPage',
    params: { postId } }">수정</router-link>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostView from '@/components/PostView';

export default {
  name: 'post-view-page',
  components: {
    PostView
  },
  props: {
    postId: {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapState(['post'])
  },
  methods: {
    ...mapActions(['fetchPost']),
  },
  created() {
    this.fetchPost(`${this.postId}`)
    .catch(err => {
      alert(err.response.data.msg);
      this.$router.back();
    })
  }
}
</script>

<style>

</style>