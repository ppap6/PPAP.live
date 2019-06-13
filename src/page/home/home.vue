<template>
  <div class="container">
    <div class="topic-list" id="left">
      <TopicList></TopicList>
    </div>
    <div class="post-list" id="center">
      <PostList :postList="postList"></PostList>
    </div>
    <div id="right">
      <div class="profile-card">
        <ProfileCard></ProfileCard>
      </div>
      <div class="hot-post-card">
        <HotPostCard></HotPostCard>
      </div>
      <div class="link-card">
        <LinkCard></LinkCard>
      </div>
    </div>
  </div>
</template>

<script>
import TopicList from "component/topic-list/topic-list"
import PostList from "component/post-list/post-list"
import ProfileCard from "component/profile-card/profile-card"
import HotPostCard from "component/hot-post-card/hot-post-card"
import LinkCard from "component/link-card/link-card"

export default {
  data(){
    return {
      postList: [
        {
          user_id: 1,
          user_name: "jwchan",
          user_avatar: "https://jwchan.cn/images/avatar.jpg",
          topic_id: 1,
          topic_name: "产品经理",
          post_id: 1,
          post_title: "这是我的第一个帖子？？？",
          post_content: "这是这个帖子内容的一部分",
          datetime: "02月22日",
          count: {
            reads: 159,
            comments: 6,
            answers: 2,
            likes: 2,
            collects: 1
          }
        },
        {
          user_id: 2,
          user_name: "梁虚天",
          user_avatar: "https://img.xiaoduyu.com/FklxjW19iOahN2nBRdVNvpyaPeao?imageMogr2/thumbnail/!200/quality/90",
          topic_id: 2,
          topic_name: "明星",
          post_id: 2,
          post_title: "这是我的第二个帖子？？？",
          post_content: "这是这个帖子内容的一部分",
          datetime: "03月22日",
          count: {
            reads: 19,
            comments: 1,
            answers: 2,
            likes: 1,
            collects: 0
          }
        },
        {
          user_id: 3,
          user_name: "陆明恒",
          user_avatar: "https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90",
          topic_id: 3,
          topic_name: "演员",
          post_id: 3,
          post_title: "这是我的第三个帖子？？？",
          post_content: "这是这个帖子内容的一部分",
          datetime: "03月28日",
          count: {
            reads: 19,
            comments: 1,
            answers: 2,
            likes: 0,
            collects: 0
          }
        },
        {
          user_id: 4,
          user_name: "周胜军",
          user_avatar: "https://img.xiaoduyu.com/Fk2Boi_rCu0cHzXGU3v14oy8Z1sR?imageMogr2/auto-orient/thumbnail/!200/quality/90",
          topic_id: 4,
          topic_name: "程序员",
          post_id: 4,
          post_title: "这是我的第四个帖子？？？",
          post_content: "这是这个帖子内容的一部分",
          datetime: "04月12日",
          count: {
            reads: 1,
            comments: 1,
            answers: 0,
            likes: 1,
            collects: 0
          }
        }
      ]
    }
  },
  components: {
    ProfileCard,
    HotPostCard,
    LinkCard,
    TopicList,
    PostList
  }
}
</script>

<style scoped>
.container {
  position: relative;
  max-width: 1180px;
  margin: auto;
}

#left {
  position: fixed;
  width: 250px;
  height: 500px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

#center {
  position: relative;
  margin-left: 260px;
  margin-right: 260px;
  height: 800px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

#right {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 600px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

.profile-card,
.hot-post-card {
  margin-bottom: 10px;
}
</style>