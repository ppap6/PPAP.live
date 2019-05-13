<template>
  <div class="like-list">
    <h1>{{ msg }}</h1>
    <div class="notice" v-for="item in noticeList" :key="item.id">
      <div class="left">
        <router-link :to="`/user/${item.id}`">
          <img class="avatar" :src="item.avatar" alt>
          <p class="name">{{item.name}}</p>
        </router-link>
      </div>
      <span class="datetime">17天前</span>
      <span class="text">点赞了你的文章</span>
      <div class="right">
        <router-link :to="`/topic/${item.post.id}`">
          <p class="title">{{item.post.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '点赞通知的组件',
      noticeList: [
        {
          id: 3,
          name: '郑宇飞',
          avatar: 'https://img.xiaoduyu.com/FnSA2VQBP1s_T_KjDuVKxFZ8EoQp',
          post: {
            id: 5,
            title: '如何实现双向绑定？'
          }
        },
        {
          id: 8,
          name: '辣子鸡',
          avatar: 'https://img.xiaoduyu.com/586658ea1985b4532700fd0a.jpg?imageMogr2/thumbnail/!200/quality/90',
          post: {
            id: 55,
            title: '深入浅出 webpack'
          }
        },
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.notice{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px 0;

  .left {
    a{
      display: flex;
      flex-direction: row;
      align-items: center;

      .avatar {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 6px;
      }

      .name{
        color: #333333;
        font-size: 14px;

        &:hover{
          text-decoration: underline;
        }
      }
    }
  } 

  .datetime{
    font-size: 14px;
    margin-left: 5px;
    color: #999999;
  }

  .text{
    font-size: 14px;
    margin: 0 5px;
    color: #999999;
  }

  .right{
    a {
      .title {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        color: #1c1e25 !important;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
