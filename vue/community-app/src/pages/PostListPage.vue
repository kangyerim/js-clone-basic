<template>
  <div class="post-list-page">
    <h1>Post List</h1>
    <post-list :posts="posts"/>
  </div>
</template>

<script>
import api from '@/api';
import PostList from '@/components/PostList';

export default {
  name: 'post-list-page',
  components: { PostList },
  data: () => ({
    posts: []
  }),
  created() {
    api.get('/posts')
    .then(res => this.posts = res.data)
  }
}
</script>

<style>

</style>