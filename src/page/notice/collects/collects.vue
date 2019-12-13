<template>
  <div class="collect-list">
    <div class="notice" v-for="item in noticeList" :key="item._id">
      <div class="left">
        <router-link :to="`/user/${item.uid}`">
          <img class="avatar" :src="item.avatar" alt>
          <p class="name">{{item.uname}}</p>
        </router-link>
      </div>
      <span class="datetime">{{item.create_time}}</span>
      <span class="text">收藏了你的文章</span>
      <div class="right">
        <router-link :to="`/post/${item.pid}`">
          <p class="title">{{item.pname}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollectNoticeList } from 'api/notice'

export default {
  data () {
    return {
      msg: '收藏通知的组件',
      pageNum: 1,
      pageSize: 20,
      noticeList: []
    }
  },
  created(){
    this.getCollectNoticeList()
  },
  methods: {
    getCollectNoticeList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getCollectNoticeList(data).then(response => {
        if(response.data.status == 200){
          this.noticeList = response.data.message
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.notice{
  position relative
  display flex
  flex-direction row
  align-items center
  background-color #FFFFFF
  padding 10px 20px
  border-radius 5px
  margin 5px 0

  .left {
    a{
      display flex
      flex-direction row
      align-items center

      .avatar {
        height 24px
        width 24px
        border-radius 50%
        margin-right 6px
      }

      .name{
        color #333333
        font-size 14px

        &:hover{
          text-decoration underline
        }
      }
    }
  } 

  .datetime{
    font-size 14px
    margin-left 5px
    color #999999
  }

  .text{
    font-size 14px
    margin 0 5px
    color #999999
  }

  .right{
    a {
      .title {
        height 18px
        line-height 18px
        font-size 14px
        color #1c1e25 !important

        &:hover {
          text-decoration underline
        }
      }
    }
  }
}
</style>
