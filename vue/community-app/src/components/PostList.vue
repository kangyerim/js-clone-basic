<template>
  <div>
      <table>
        <colgroup>
          <col style="width: 10%;" />
          <col style="width: 60%;" />
          <col style="width: 10%;" />
          <col style="width: 20%;" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col">Writer</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post) in posts" :key="post.id">
            <td scope="col">{{post.id}}</td>
            <td scope="col">
              <router-link :to="{ name: 'PostListPage' }">{{post.title}}</router-link> [{{post.comments.length}}]</td>
            <td scope="col">{{post.user.name}}</td>
            <td scope="col">{{post.createdAt}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'post-list',
  props: {
    posts: {
      type: Array
    }
  }
}
</script>

<style>

</style>