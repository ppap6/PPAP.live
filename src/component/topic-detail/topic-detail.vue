<template>
  <div class="topic">
    <div class="detail">
      <img :src="topic.icon" alt="图标">
      <div class="information">
        <div class="name">{{topic.name}}</div>
        <div class="intro">{{topic.intro}}</div>
        <div class="count" v-if="topic.sid != 0">
          <span class="posts">帖子 {{topic.posts}}</span>
          <span class="follows">关注 {{topic.followers}}</span>
        </div>
      </div>
      <div class="follow" v-if="topic.sid != 0">关注</div>
    </div>
    <PostList :postList="postList"></PostList>
  </div>
</template>

<script>
import PostList from "component/post-list/post-list"
import { getTopic } from "api/topic"
import { getPostList } from "api/post"

export default {
  data () {
    return {
      msg: '我是话题详情组件',
      topic: {},
      postList: []
    }
  },
  components: {
    PostList
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
        }else if(response.data.status === 10003){
          this.topic = {}
        }else{
          console.log('服务器开小差了，请稍后重试！')
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
.topic {
  max-width: 720px;
  margin: auto;

  h1 {
    padding: 10px;
  }

  .detail {
    position: relative;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    .information {
      padding: 0 10px;
      text-align: left;

      .name {
        font-size: 24px;
        color: #171717;
      }

      .intro {
        font-size: 14px;
        color: #444;
        padding: 4px 0;
      }

      .count{
        font-size: 14px;
        color: #777;

        .posts{
          padding-right: 10px;
        }

        .follows{
          padding-right: 10px;
        }
      }
    }

    .follow{
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
