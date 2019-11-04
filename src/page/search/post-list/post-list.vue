<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="post-list">
      <PostList :postList="postList"></PostList>
    </div>
  </div>
</template>

<script>
import PostList from "component/post-list/post-list"

export default {
  data() {
    return {
      msg: '搜索帖子列表组件',
      postList: [
        {
          user_id: 1,
          user_name: "Jwchan",
          user_avatar: "https://jwchan.cn/images/avatar.jpg",
          topic_id: 1,
          topic_name: "Vue",
          post_id: 1,
          post_title: "深入浅出 webpack 原理",
          post_content: "这是这个帖子内容的一部分",
          datetime: "02月22日",
          count: {
            reads: 159,
            comments: 6,
            answers: 2,
            likes: 2,
            collects: 1
          }
        }
      ]
    };
  },
  components: {
    PostList
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;
  margin: 5px 0;
}
</style>
