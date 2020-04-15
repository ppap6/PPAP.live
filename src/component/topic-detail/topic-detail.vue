<template>
  <div class="topic">
    <Loading :loading="loading"></Loading>
    <div class="detail">
      <img :src="topic.icon" alt>
      <div class="information">
        <div class="name">{{topic.name}}</div>
        <div class="intro">{{topic.intro}}</div>
        <div class="count" v-if="topic.sid != 0">
          <span class="posts">帖子 {{topic.posts}}</span>
          <span class="follows">关注 {{topic.followers}}</span>
        </div>
      </div>
      <div class="follow" @click="followTopic" v-if="topic.sid != 0 && noFollow">关注</div>
      <div class="follow" @click="cancelFollowTopic" v-if="topic.sid != 0 && isFollow">已关注</div>
    </div>
    <PostList :postList="postList" :noData="noData"></PostList>
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import Loading from 'component/loading/loading'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import PostList from "component/post-list/post-list"
import { getTopic } from "api/topic"
import { getPostList } from "api/post"
import { followTopic, cancelFollowTopic, getUserTopicStatus } from "api/user"
import util from 'common/js/util'

export default {
  name: 'TopicDetail',
  data () {
    return {
      msg: '我是话题详情组件',
      topic: {},
      noFollow: true,
      isFollow: false,
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
    PostList
  },
  watch: {
    $route(to, from){
      if(to.name == 'Topic'){
        if(this.topic.id != this.$route.query.id){
          this.topic = {}
          this.noFollow = true
          this.isFollow = false
          this.pageNum = 1,
          this.total = 0
          this.loadMoreState = false
          this.hasMore = true
          this.postList = []
          this.noData = false
          this.loading = true
          this.getTopic()
          this.getPostList()
        }
        this.listenScroll() 
      }
      if(from.name == 'Topic'){
        this.removeListenScroll() 
      }
    }
  },
  created(){
    this.getTopic()
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
    getTopic(){
      let id = this.$route.params.id
      getTopic(id).then(response => {
        if(response.data.status === 200){
          this.topic = response.data.message
          //获取用户对话题的关注状态
          this.getUserTopicStatus()
        }else if(response.data.status === 10003){
          this.topic = {}
          //隐藏加载动画
          this.loading = false
          swal({
            title: '这个话题并不存在呢'
          }).then(() => {
            this.$router.replace({
              path: '/'
            })
          })
        }else{
          //隐藏加载动画
          this.loading = false
          swal({
            title: response.data.message
          }).then(() => {
            this.$router.replace({
              path: '/'
            })
          })
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    getPostList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        topic_id: this.$route.params.id
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
        page_size: this.pageSize,
        topic_id: this.$route.params.id
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
    },
    followTopic(){
      let data = {
        follow_topic_id: this.$route.params.id
      }
      followTopic(data).then(response => {
        if(response.data.status === 200){
          this.isFollow = true
          this.noFollow = false
          this.topic.followers ++
        }else if(response.data.status === 10000){
          this.isFollow = true
          this.noFollow = false
          swal({
            title: '已关注话题'
          })
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    cancelFollowTopic(){
      let data = {
        follow_topic_id: this.$route.params.id
      }
      cancelFollowTopic(data).then(response => {
        if(response.data.status === 200){
          this.isFollow = false
          this.noFollow = true
          this.topic.followers --
        }else if(response.data.status === 10000){
          this.isFollow = false
          this.noFollow = true
          swal({
            title: '已取消关注话题'
          })
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    getUserTopicStatus(){
      let topicId = this.$route.params.id
      getUserTopicStatus(topicId).then(response => {
        if(response.data.status === 200){
          this.isFollow = response.data.message.isFollow
          this.noFollow = !response.data.message.isFollow
        }else if(response.data.status === 401){
          //不作处理
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
.topic {
  max-width 720px
  margin auto

  h1 {
    padding 10px
  }

  .detail {
    position relative
    background-color #ffffff
    border-radius 5px
    padding 20px
    margin-bottom 10px
    display flex
    flex-direction row
    align-items center

    img {
      width 80px
      height 80px
      // border-radius 50%
      flex-shrink 0
    }

    .information {
      padding 0 10px
      text-align left

      .name {
        font-size 24px
        color #171717
      }

      .intro {
        font-size 14px
        color #444
        padding 4px 0
      }

      .count{
        font-size 12px
        color #777

        .posts{
          padding-right 10px
        }

        .follows{
          padding-right 10px
        }
      }
    }

    .follow{
      position absolute
      top 20px
      right 20px
      font-size 14px
      cursor pointer
      padding 4px 10px
      border-radius 15px
      color #515151
      background-color #ececec
      transition all 0.1s linear 

      &:hover{
        background-color #4170ea
        color #fff
        transform scale(1.1)
      }
    }
  }
}
</style>
