<template>
  <div class="topic">
    <h1>{{ msg }}</h1>
    <div class="detail">
      <img :src="topic.avatar" alt="图标">
      <div class="information">
        <div class="name">{{topic.name}}</div>
        <div class="intro">{{topic.intro}}</div>
        <div class="count">
          <span class="posts">2 帖子</span>
          <span class="follows">10 关注</span>
        </div>
      </div>
      <div class="follow">关注</div>
    </div>
    <PostList :postList="postList"></PostList>
  </div>
</template>

<script>
import PostList from "component/post-list/post-list"

export default {
  data () {
    return {
      msg: '我是话题详情组件',
      topic: {
        avatar: "https://img.xiaoduyu.com/885719a9-f083-47df-853a-a003764f4017.jpg?imageMogr2/crop/!400x400a0a0/thumbnail/!200",
        name: "Vue",
        intro: "Vue是一个构建数据驱动的 web 界面的渐进式框架。"
      },
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
    PostList
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
