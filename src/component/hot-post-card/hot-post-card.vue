<template>
  <div class="container">
    <div class="title">
      <p>热门讨论</p>
    </div>
    <div class="post-list">
      <div class="post" v-for="item in posts">
        <img class="hot-icon" src="../../common/img/hot.png" alt>
        <router-link to="/post/帖子id">
          <p class="post-title">{{item.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          title: "前端知识之 vue 知识进阶"
        },
        {
          title: "前端知识之 react 知识进阶"
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
}

.title {
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #ececec;
}

.title p {
  height: 16px;
  line-height: 16px;
  text-align: left;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 14px;
  border-left: 3px solid #009688;
}

.post-list {
  padding: 10px;
}

.post {
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hot-icon {
  height: 25px;
  width: 25px;
}

.post-title {
  font-size: 12px;
  color: #171717;
}
.post-title:hover {
  text-decoration: underline;
}
</style>
