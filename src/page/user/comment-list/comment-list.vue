<template>
  <div class="container">
    <div class="comment-list">
      <router-link :to="`/comment/${item._id}`" target="_blank" v-for="item in commentList" :key="item._id">
        <div class="comment">
          <div class="header">
            <span class="datetime">{{item.create_time}}</span>
            <span class="lights">亮了({{item.lights}})</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="post">
            <span class="text">来自：</span>
            <span class="title">{{item.ptitle}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getPersonCommentList } from 'api/person'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'

export default {
  data() {
    return {
      msg: "我的回帖列表组件",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      commentList: [],
      noData: false
    }
  },
  created(){
    this.getPersonCommentList()
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
    getPersonCommentList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        user_id: this.$route.params.id
      }
      getPersonCommentList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.commentList = response.data.message.list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.commentList = []
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
        page_size: this.pageSize,
        user_id: this.$route.params.id
      }
      getPersonCommentList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.commentList.push(list[i])
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
.container {
  border-radius 5px

  .comment {
    padding 10px 20px 15px 20px
    margin 5px 0
    border-radius 5px
    background-color #ffffff
    text-align left

    &:hover {
      cursor pointer
    }

    .header {
      display flex
      flex-direction row
      align-items center
      justify-content space-between

      .datetime {
        font-size 12px
        color #999999
      }

      .lights{
        font-size 12px
        color #999999
      }
    }

    .quote{
      border-radius 5px
      background-color #ececec
      margin-top 5px

      .header{
        display flex
        flex-direction row
        align-items center
        justify-content left 
        padding 10px
        
        img{
          width 20px
          height 20px 
          border-radius 50%
        }

        .uname{
          font-size 12px
          color #666
          margin-left 5px
        }
      }

      .content{
        padding 0 10px 10px 10px
        font-size 14px
      }
    }

    .content {
      padding 10px 0
      color #171717
      font-size 14px
    }

    .post {
      font-size 15px

      .text{
        color #515151
        font-weight bold
      }

      .title{
        color #009688
        font-weight bold
        border-radius 5px
      }
    }
  }

  .nofound {
    height 200px
    width 200px
  }
}
</style>
