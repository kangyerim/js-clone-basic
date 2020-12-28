<template>
  <div class="post-list-page">
    <h1>Post List</h1>
    <post-list :posts="posts"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostList from '@/components/PostList';

export default {
  name: 'post-list-page',
  components: { PostList },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapActions(['fetchPostList']),
  },
  created() {
    this.fetchPostList();
  }
}
</script>

<style>

</style>