<template>
  <div class="post-detail">
    <h1>{{ msg }}</h1>
    <div class="post-header">
      <router-link to="/user/用户id">
        <img :src="post.avatar" alt="头像">
      </router-link>
      <div class="information">
        <router-link to="/user/用户id">
          <div class="name">{{post.name}}</div>
        </router-link>
        <div class="last-datetime">{{post.last_datetime}}</div>
      </div>
    </div>
    <div class="post-content">
      <div class="title">{{post.title}}</div>
      <div class="content">{{post.content}}</div>
    </div>
    <div class="post-footer">
      <div class="left">
        <span class="reads">44 次阅读</span>
        <span class="comments">3 条评论</span>
        <span class="answers">6 条回复</span>
      </div>
      <div class="right">
        <span class="likes">点赞</span>
        <span class="collects">收藏</span>
      </div>
    </div>
    <!-- 评论组件  -->
    <CommentList></CommentList>
  </div>
</template>

<script>
import CommentList from 'component/comment-list/comment-list'

export default {
  data() {
    return {
      msg: "我是帖子详情组件",
      post: {
        id: 1,
        name: "大虫子",
        avatar:
          "https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90",
        last_datetime: "2019-04-28 15:30:22",
        title: "我是这个帖子的标题",
        content: "我是这个帖子的正文 🍰🍰🍰🍰🍰🍰🍰🍰🍰"
      }
    };
  },
  components: {
    CommentList
  }
};
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
    padding: 10px 20px;
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
      border-bottom: 1px solid #ddd;
    }

    .content{
      padding: 10px 0;
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
        padding-left: 10px;
        cursor: pointer;
      }

      .collects{
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>