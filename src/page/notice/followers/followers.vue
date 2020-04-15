<template>
  <div class="follower-list">
    <div class="notice" v-for="item in noticeList" :key="item._id">
      <div class="left">
        <router-link :to="`/user/${item.uid}`">
          <img class="avatar" :src="item.avatar" alt>
          <p class="name">{{item.uname}}</p>
        </router-link>
      </div>
      <span class="datetime">{{item.create_time}}</span>
      <span class="text">关注了你</span>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getFollowNoticeList } from 'api/notice'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'

export default {
  data () {
    return {
      msg: '关注通知的组件',
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      noticeList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞，5为收藏
      ],
      noData: false
    }
  },
  created(){
    this.getFollowNoticeList()
  },
  mounted(){
    this.listenScroll()
  },
  destroyed(){
    this.removeListenScroll()
  },
  components: {
    LoadingBottom
  },
  methods: {
    listenScroll(){
      window.addEventListener('scroll', this.handleScroll)
    },
    removeListenScroll(){
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll(){
      let scrollDiff = util.getScrollHeight() - util.getClientHeight() - util.getScrollTop()
      if(scrollDiff < 50){
        this.loadMore()
      }
    },
    getFollowNoticeList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
      }
      getFollowNoticeList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.noticeList = response.data.message.list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.noticeList = []
          this.noData = true
          this.hasMore = false
        }else{
          //不作处理
          this.hasMore = false
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    loadMore(){
      //判断当前是否正在加载，避免多次加载
      if(this.loadMoreState){
        return
      }
      //进入加载模式
      this.loadMoreState = true
      this.pageNum ++
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getFollowNoticeList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.noticeList.push(list[i])
          }
          this.loadMoreState = false
        }else if(response.data.status === 10003){
          this.hasMore = false
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.follower-list {
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

  .nofound {
    height 200px
    width 200px
  }
}
</style>
