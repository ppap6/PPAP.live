<template>
  <div class="container">
    <div class="post-list">
      <PostList :useInPerson="true" :postList="postList" :noData="noData"></PostList>
      <LoadingBottom :state="hasMore"></LoadingBottom>
    </div>
  </div>
</template>

<script>
import PostList from 'component/post-list/post-list'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import { getPersonPostList } from 'api/person'
import util from 'common/js/util'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      postList: [],
      noData: false
    }
  },
  components: {
    PostList,
    LoadingBottom
  },
  created(){
    this.getPersonPostList()
  },
  mounted(){
    this.listenScroll()
  },
  destroyed(){
    this.removeListenScroll()
  },
  methods: {
    listenScroll(){
      window.addEventListener("scroll", this.handleScroll)
    },
    removeListenScroll(){
      window.removeEventListener("scroll", this.handleScroll)
    },
    handleScroll(){
      let scrollDiff = util.getScrollHeight() - util.getClientHeight() - util.getScrollTop()
      if(scrollDiff < 50){
        this.loadMore()
      }
    },
    getPersonPostList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        user_id: this.$route.params.id,
      }
      getPersonPostList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.postList = response.data.message.list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.postList = []
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
      getPersonPostList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.postList.push(list[i])
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
  text-align left

  .post {
    padding 20px 20px 5px 20px
    margin-bottom 10px
    border-radius 5px
    background-color #ffffff

    &:hover{
      cursor pointer
    }
  }

  .post-header {
    display flex
    flex-direction row
    align-items center

    .header-left {
      .avatar {
        height 45px
        width 45px
        border-radius 50%
      }
    }

    .header-right {
      padding 2px 15px

      a {
        .name {
          height 18px
          line-height 18px
          font-size 14px
          font-weight bold
          color #1c1e25 !important

          &:hover {
            text-decoration underline
          }
        }
      }

      .display {
        height 18px
        line-height 18px
        font-size 14px
        font-weight bold

        a {
          .topic {
            font-size 12px
            color #333333 !important

            &:hover {
              text-decoration underline
            }

            &:after {
              vertical-align center
              font-size 8px
              margin 0 8px 0 8px
              content "\2022"
            }
          }
        }

        .datetime {
          font-size 12px
          color #999999
        }
        

      }
    }
  }

  .post-content{
    padding 5px 0

    a {
      .post-title{
        color #1c1e25 !important
        font-size 16px
        font-weight bold
        padding-bottom 5px

        &:hover{
          text-decoration underline
        }
      }
    }

    .post-summary{
      font-size 14px
    }

    .statistics{
      padding 5px 0 0 0

      .reads,
      .comments,
      .answers,
      .likes,
      .collects{
        font-size 14px
        color #999999
        margin-right 15px
      }
    }
  }
}
</style>
