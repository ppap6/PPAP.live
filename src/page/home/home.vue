<template>
  <div class="container">
    <Loading :loading="loading"></Loading>
    <div class="left topic-list">
      <TopicList class="topic-list-content" :isRouter="true"></TopicList>
    </div>
    <div class="center post-list">
      <PostList :postList="postList" :noData="noData"></PostList>
      <LoadingBottom :state="hasMore"></LoadingBottom>
    </div>
    <div class="right">
      <div class="right-list-content">
        <div class="hot-post-card">
          <HotPostCard></HotPostCard>
        </div>
        <div class="link-card">
          <LinkCard></LinkCard>
        </div>
        <div class="copyright">
          <span>©2020</span>
          <a href="https://github.com/ppap6/PPAP.live" target="_blank">PPAP</a>
          <span>created by</span>
          <a href="https://github.com/jwchan1996" target="_blank">jwchan</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'component/loading/loading'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import TopicList from "component/topic-list/topic-list"
import PostList from "component/post-list/post-list"
import HotPostCard from "component/hot-post-card/hot-post-card"
import LinkCard from "component/link-card/link-card"

import { getPostList } from 'api/post'
import util from 'common/js/util'

export default {
  name: 'Home',
  data(){
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      postList: [],
      noData: false,
      loading: true
    }
  },
  components: {
    Loading,
    LoadingBottom,
    HotPostCard,
    LinkCard,
    TopicList,
    PostList
  },
  watch: {
    $route(to, from){   
      if(from.path == '/'){
        this.removeListenScroll() 
      }
      if(to.path == '/'){
        this.listenScroll() 
      }
    }
  },
  created(){
    this.getPostList()
  },
  mounted(){
    this.listenScroll()
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
    getPostList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getPostList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.postList = response.data.message.list
          //隐藏加载动画
          this.loading = false
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.postList = []
          this.noData = true
          //隐藏加载动画
          this.loading = false
          this.hasMore = false
        }else{
          //不作处理
          //隐藏加载动画
          this.loading = false
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
      getPostList(data).then(response => {
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
  position relative
  max-width 1180px
  margin auto

  .left {
    position fixed
    width 250px
    height 500px
    border-radius 5px
  }

  .center {
    position relative
    margin-left 260px
    margin-right 260px
    // height 800px
    border-radius 5px
  }

  .right {
    position absolute
    top 0
    right 0
    width 250px
    height 600px
    border-radius 5px

    .right-list-content {
      position fixed
      width 250px

      .hot-post-card {
        margin-bottom 10px
      }

      .copyright {
        font-size 12px
        padding 10px
        text-align left
      }
    }
  }
}
</style>