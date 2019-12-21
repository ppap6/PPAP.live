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
    <PostList :postList="postList"></PostList>
  </div>
</template>

<script>
import Loading from 'component/loading/loading'
import PostList from "component/post-list/post-list"
import { getTopic } from "api/topic"
import { getPostList } from "api/post"
import { followTopic, cancelFollowTopic, getUserTopicStatus } from "api/user"

export default {
  name: 'TopicDetail',
  data () {
    return {
      msg: '我是话题详情组件',
      topic: {},
      noFollow: true,
      isFollow: false,
      postList: [],
      loading: true
    }
  },
  components: {
    Loading,
    PostList
  },
  watch: {
    $route(to, from){
      if(to.name == 'Topic'){
        this.getTopic()
        this.getPostList()
        console.log(this.$route)
      }
    }
  },
  created(){
    this.getTopic()
    this.getPostList()
  },
  methods: {
    getTopic(){
      let id = this.$route.params.id
      getTopic(id).then(response => {
        if(response.data.status === 200){
          this.topic = response.data.message
          //获取用户对话题的关注状态
          this.getUserTopicStatus()
          //隐藏加载动画
          this.loading = false
        }else if(response.data.status === 10003){
          //隐藏加载动画
          this.loading = false
          this.topic = {}
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
        page_num: 1,
        page_size: 20,
        topic_id: this.$route.params.id
      }
      getPostList(data).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message
        }else if(response.data.status === 10003){
          this.postList = []
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
      border-radius 50%
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
