<template>
  <div class="post-view-page">
    <div class="post-view">
      <div>
        <h1>게시글의 제목이 노출된다</h1>
        <span>게시판 번호 1</span>
        <strong>강예림 . 2020-12-28 22:24</strong>
      </div>
      <p>해당 영역은 게시글의 콘텐츠 내용</p>
    </div>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'post-view-page',
  props: {
    postId: {
      type: String,
      required: true,
    }
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