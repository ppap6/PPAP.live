<template>
  <div class="post-detail">
    <div class="post-header">
      <router-link :to="`/user/${post.uid}`">
        <img :src="post.avatar" alt>
      </router-link>
      <div class="information">
        <router-link :to="`/user/${post.uid}`">
          <div class="name">{{post.uname}}</div>
        </router-link>
        <div class="display">
          <router-link :to="`/topic/${post.topic_id}`">
            <span class="topic">{{post.topic_name}}</span>
          </router-link>
          <span class="datetime">{{post.create_time}}</span>
        </div>
      </div>
    </div>
    <div class="post-footer">
      <div class="left">
        <span class="reads">{{post.pv}} 次阅读</span>
        <span class="comments">{{post.comments}} 条评论</span>
        <span class="answers">{{post.answers}} 条回复</span>
      </div>
      <div class="right">
        <span class="likes" @click="likePost" v-show="noLike">点赞 {{post.likes}}</span>
        <span class="likes" @click="cancelLikePost" v-show="isLike">已点赞 {{post.likes}}</span>
        <span class="collects" @click="collectPost" v-show="noCollect">收藏 {{post.collects}}</span>
        <span class="collects" @click="cancelCollectPost" v-show="isCollect">已收藏 {{post.collects}}</span>
      </div>
    </div>
    <div class="post-content">
      <div class="title">{{post.title}}<span class="edit" @click="goUpdatePost" v-if="uid == post.uid">编辑</span></div>
      <div class="content" v-html="post.content"></div>
    </div>
    <!-- 评论组件  -->
    <CommentList></CommentList>
  </div>
</template>

<script>
import CommentList from 'component/comment-list/comment-list'
import { getStorage } from 'common/js/localstorage'
import { getPost, addPv } from 'api/post'
import { likePost, cancelLikePost, collectPost, cancelCollectPost, getUserPostStatus } from 'api/user'

export default {
  name: 'PostDetail',
  data() {
    return {
      msg: "我是帖子详情组件",
      uid: getStorage('user').uid,
      post: {},
      noLike: true,
      isLike: false,
      noCollect: true,
      isCollect: false 
    }
  },
  components: {
    CommentList
  },
  watch: {
    $route(to, from){
      if(to.name == 'PostDetail'){
        window.scrollTo(0, 0)
        this.getPost()
      }
    }
  },
  created(){
    this.addPv()
    this.getPost()
  },
  methods: {
    getPost(){
      let id = this.$route.params.id
      getPost(id).then(response => {
        if(response.data.status === 200){
          this.post = response.data.message
          //获取用户对帖子的点赞收藏状态
          this.getUserPostStatus()
        }else if(response.data.status === 10003){
          this.post = {}
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    addPv(){
      let data = {
        pid: this.$route.params.id
      }
      addPv(data)
    },
    likePost(){
      let data = {
        pid: this.$route.params.id
      }
      likePost(data).then(response => {
        if(response.data.status === 200){
          this.isLike = true
          this.noLike = false
          this.post.likes ++
        }else if(response.data.status === 10000){
          this.isLike = true
          this.noLike = false
          alert('已点赞帖子')
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    cancelLikePost(){
      let data = {
        pid: this.$route.params.id
      }
      cancelLikePost(data).then(response => {
        if(response.data.status === 200){
          this.isLike = false
          this.noLike = true
          this.post.likes --
        }else if(response.data.status === 10000){
          this.isLike = false
          this.noLike = true
          alert('已取消点赞帖子')
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    collectPost(){
      let data = {
        pid: this.$route.params.id
      }
      collectPost(data).then(response => {
        if(response.data.status === 200){
          this.isCollect = true
          this.noCollect = false
          this.post.collects ++
        }else if(response.data.status === 10000){
          this.isCollect = true
          this.noCollect = false
          alert('已收藏帖子')
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    cancelCollectPost(){
      let data = {
        pid: this.$route.params.id
      }
      cancelCollectPost(data).then(response => {
        if(response.data.status === 200){
          this.isCollect = false
          this.noCollect = true
          this.post.collects --
        }else if(response.data.status === 10000){
          this.isCollect = false
          this.noCollect = true
          alert('已取消收藏帖子')
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    getUserPostStatus(){
      let postId = this.$route.params.id
      getUserPostStatus(postId).then(response => {
        if(response.data.status === 200){
          this.isLike = response.data.message.isLike
          this.noLike = !response.data.message.isLike
          this.isCollect = response.data.message.isCollect
          this.noCollect = !response.data.message.isCollect
        }else if(response.data.status === 401){
          //不作处理
        }else{
          console.log('服务器开小差了，请稍后重试！')
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    goUpdatePost(){
      this.$router.push({
        path: '/update-post',
        query: {
          id: this.post.id
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.post-detail {
  max-width 800px
  margin auto

  h1 {
    padding 10px
  }

  .post-header {
    position relative
    background-color #ffffff
    border-top-left-radius 5px
    border-top-right-radius 5px
    padding 20px 30px 0
    display flex
    flex-direction row
    align-items center

    img {
      width 50px
      height 50px
      border-radius 50%
    }

    .information {
      padding 0 10px
      text-align left

      .name {
        font-size 16px
        color #333333

        &:hover{
          text-decoration underline
        }
      }

      .display {
        height 18px
        line-height 18px
        font-size 14px
        // font-weight bold

        
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

        .datetime {
          font-size 12px
          color #999999
        }
      }
    }
  }

  .post-content {
    text-align left
    padding 10px 40px
    background-color #FFF

    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ h4,
    /deep/ h5,
    /deep/ h6 {
      margin 16px 0
    }

    /deep/ p {
      margin 12px 0
    }

    .title {
      font-size 30px
      line-height 60px
      width 100%
      border-bottom 1px solid #ececec

      .edit {
        font-size 14px
        color #414141
        background-color #f2f2f2
        padding 4px 10px
        margin 5px 10px 15px
        border-radius 10px
        cursor pointer
        transition all .1s linear

        &:hover {
          color #fff
          background-color #4170ea
        }
      }
    }

    .content {
      padding 30px 0 10px

      /deep/ .hljs {
        padding 0
      }

      /* table 样式 */
      /deep/ table {
        border-top 1px solid #ccc
        border-left 1px solid #ccc

        td,
        th {
          border-bottom 1px solid #ccc
          border-right 1px solid #ccc
          padding 3px 5px
        }

        th {
          border-bottom 2px solid #ccc
          text-align center
        }
      }

      /* blockquote 样式 */
      /deep/ blockquote {
        display block
        border-left 4px solid #CBCBCB
        padding 1px 10px
        margin 20px 0
        line-height 1.4
        font-size 100%
        background-color #f8f8f8
      }

      /* code 样式 */
      /deep/ code {
        display inline-block
        *display inline
        *zoom 1
        background-color #f8f8f8
        border-radius 3px
        padding 3px 5px
        margin 0 3px
      }
      /deep/ pre{
        code {
          display block
          padding 1em
        }
      } 

      /* ul ol 样式 */
      /deep/ ul, ol {
        margin 10px 0 10px 20px
      }
    }
  }

  .post-footer{
    background-color #FFFFFF
    border-bottom-left-radius 5px
    border-bottom-right-radius 5px
    display flex
    flex-direction row
    align-items center
    justify-content space-between
    padding-top 10px

    .left{
      padding 0 40px 10px
      font-size 14px
      color #777
      display block !important

      .reads{
        padding-right 10px
      }

      .comments{
        padding-right 10px
      }

      .answers{
        padding-right 10px
      }
    }

    .right{
      padding 0 40px 15px
      font-size 14px
      color #777

      .likes{
        padding 4px 10px
        cursor pointer
        background-color #ececec
        border-radius 15px
        transition all .1s linear

        &:hover{
          background-color #4170ea
          color #fff
        }
      }

      .collects{
        padding 4px 10px
        cursor pointer
        background-color #ececec
        border-radius 15px
        transition all .1s linear

        &:hover{
          background-color #4170ea
          color #fff
        }
      }
    }
  }
}
</style>