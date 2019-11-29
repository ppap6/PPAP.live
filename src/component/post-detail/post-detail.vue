<template>
  <div class="post-detail">
    <div class="post-header">
      <router-link :to="`/user/${post.uid}`">
        <img :src="post.avatar" alt="头像">
      </router-link>
      <div class="information">
        <router-link :to="`/user/${post.uid}`">
          <div class="name">{{post.uname}}</div>
        </router-link>
        <div class="last-datetime">{{post.create_time}}</div>
      </div>
    </div>
    <div class="post-content">
      <div class="title">{{post.title}}</div>
      <div class="content" v-html="post.content"></div>
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
    <!-- 评论组件  -->
    <CommentList></CommentList>
  </div>
</template>

<script>
import CommentList from 'component/comment-list/comment-list'
import { getPost } from 'api/post'
import { likePost, cancelLikePost, collectPost, cancelCollectPost } from 'api/user'

export default {
  data() {
    return {
      msg: "我是帖子详情组件",
      post: {},
      noLike: true,
      isLike: false,
      noCollect: true,
      isCollect: false 
    };
  },
  components: {
    CommentList
  },
  created(){
    this.getPost()
  },
  methods: {
    getPost(){
      let id = this.$route.params.id
      getPost(id).then(response => {
        if(response.data.status === 200){
          this.post = response.data.message
        }else if(response.data.status === 10003){
          this.post = {}
        }else{
          console.log('服务器开小差了，请稍后重试！')
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    likePost(){
      let data = {
        pid: this.$route.params.id
      }
      likePost(data).then(response => {
        if(response.data.status === 200){
          this.isLike = true
          this.noLike = false
        }else if(response.data.status === 10000){
          this.isLike = true
          this.noLike = false
          alert('已点赞帖子')
        }else{
          console.log('服务器开小差了，请稍后重试！')
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
        }else if(response.data.status === 10000){
          this.isLike = false
          this.noLike = true
          alert('已取消点赞帖子')
        }else{
          console.log('服务器开小差了，请稍后重试！')
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
        }else if(response.data.status === 10000){
          this.isCollect = true
          this.noCollect = false
          alert('已收藏帖子')
        }else{
          console.log('服务器开小差了，请稍后重试！')
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
        }else if(response.data.status === 10000){
          this.isCollect = false
          this.noCollect = true
          alert('已取消收藏帖子')
        }else{
          console.log('服务器开小差了，请稍后重试！')
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.post-detail {
  max-width: 720px;
  margin: auto;

  h1 {
    padding: 10px;
  }

  .post-header {
    position: relative;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 20px 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .information {
      padding: 0 10px;
      text-align: left;

      .name {
        font-size: 16px;
        color: #333333;

        &:hover{
          text-decoration: underline;
        }
      }

      .last-datetime {
        font-size: 14px;
        color: #797979;
      }
    }
  }

  .post-content{
    text-align: left;
    padding: 10px 20px;
    background-color: #FFF;

    .title{
      font-size: 30px;
      line-height: 60px;
      width: 100%;
      border-bottom: 1px solid #ececec;
    }

    .content{
      padding: 30px 0 10px;
    }
  }

  .post-footer{
    background-color: #FFFFFF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .left{
      padding: 10px 20px;
      font-size: 14px;
      color: #777;

      .reads{
        padding-right: 10px;
      }

      .comments{
        padding-right: 10px;
      }

      .answers{
        padding-right: 10px;
      }
    }

    .right{
      padding: 10px 20px;
      font-size: 14px;
      color: #777;

      .likes{
        padding: 4px 10px;
        cursor: pointer;
        background-color: #ececec;
        border-radius: 10px;

        &:hover{
          background-color: #4170ea;
          color: #fff;
        }
      }

      .collects{
        padding: 4px 10px;
        cursor: pointer;
        background-color: #ececec;
        border-radius: 10px;

        &:hover{
          background-color: #4170ea;
          color: #fff;
        }
      }
    }
  }
}
</style>