<template>
  <div class="hot-post-card">
    <div class="title">
      <div class="content">
        <span>热门讨论</span>
        <img class="hot-icon" src="~common/img/hot.png" alt>
      </div>
    </div>
    <div class="post-list">
      <div class="post" v-for="item in postList" :key="item.id">
        <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
        <img class="avatar" src="~common/img/avatar.gif" alt v-else>
        <router-link :to="`/post/${item.id}`">
          <p class="post-title">{{item.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotPostList } from 'api/post'

export default {
  data() {
    return {
      postList: []
    }
  },
  created(){
    this.getHotPostList()
  },
  methods: {
    getHotPostList(){
      let data ={
        page_num: 1,
        page_size: 5
      }
      getHotPostList(data).then(response => {
        if(response.data.status == 200){
          this.postList = response.data.message.list
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.hot-post-card {
  background-color hsl(0, 0%, 100%)
  border-radius 5px

  .title {
    width 100%
    height 36px
    display flex
    flex-direction column
    justify-content center
    border-bottom 1px solid #ececec

    .content {
      display flex
      align-items center

      span {
        height 16px
        line-height 16px
        text-align left
        padding 0 5px 0 10px
        margin-left 10px
        font-size 14px
        border-left 3px solid #009688
        display inline-block
      }

      .hot-icon {
        height 22px
        width 22px
      }
    }
  }

  .post-list {
    padding 10px

    .post {
      font-size 14px
      text-align left
      display flex
      flex-direction row
      align-items center
      margin 10px auto

      .avatar {
        height 25px
        width 25px
        border-radius 50%
        flex-shrink 0
      }

      .post-title {
        font-size 12px
        color #171717
        margin-left 10px
      }
      .post-title:hover {
        text-decoration underline
      }
    }
  }
}
</style>
