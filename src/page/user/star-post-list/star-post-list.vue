<template>
  <div class="user-star-post-list">
    <h1>{{ msg }}</h1>
    <div class="post" v-for="item in postList" :key="item.id">
      <div class="title">
        <router-link to="/post/帖子id">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我点赞的帖子列表组件',
      postList: [
        {
          id: 3,
          title: 'Flutter 1.5 发布，正式成为全平台 UI 框架'
        },
        {
          id: 4,
          title: '手摸手，带你用 vue 撸后台 系列五（v4.0 版本）'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.post{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: top;
  background-color: #FFFFFF;
  padding: 10px 20px 10px;
  border-radius: 5px;
  margin: 5px 0;

  .title{
    &:hover{
      text-decoration: underline;
    }

    a{
      font-size: 14px;
      color: #515151;
      cursor: pointer;
    }
  }
}
</style>
