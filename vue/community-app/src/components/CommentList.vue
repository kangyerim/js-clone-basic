<template>
  <ul class="comments">
    <li v-for="comment in comments" :key="comment.id">
      <comment-item :comment="comment" />
    </li>
    <li v-if="!comments.length">
      입력된 댓글이 없습니다.
    </li>
  </ul>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue';

export default {
  name: 'comment-list',
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>

</style>