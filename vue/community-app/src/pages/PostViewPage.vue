<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <router-link :to="{ name: 'PostEditPage',
    params: { postId } }">수정</router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
  </div>
</template>

<script>
import api from '@/api';
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
    onDelete() {
      const { id } = this.post;
      api.delete(`/posts/${id}`)
        .then(res => {
          alert('게시글이 성공적으로 삭제되었습니다.');
          this.$router.push({ name: 'PostListPage' });
        })
        .catch(err => {
          if(err.response.status === 401) {
            alert('로그인이 필요합니다');
            this.$router.push({ name: 'Signin' });
          } else {
            console.dir(err.response.data.msg);
          }
        })
    }
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