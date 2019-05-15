<template>
  <div class="container">
    <div class="post-list">
      <div class="post" v-for="post in postList" :key="post.post_id">
        <div class="post-header">
          <div class="header-left">
            <router-link :to="`/user/${post.user_id}`">
              <img class="avatar" :src="post.user_avatar" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link :to="`/user/${post.user_id}`">
              <p class="name">{{post.user_name}}</p>
            </router-link>
            <div class="display">
              <router-link :to="`/topic/${post.topic_id}`">
                <span class="topic">{{post.topic_name}}</span>
              </router-link>
              <span class="datetime">{{post.datetime}}</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link :to="`/post/${post.post_id}`">
            <div class="post-title">{{post.post_title}}</div>
          </router-link>
          <div class="post-summary">{{post.post_content}}</div>
          <div class="statistics">
            <span class="reads" v-if="post.count.reads">{{post.count.reads}} 次阅读</span>
            <span class="comments" v-if="post.count.comments">{{post.count.comments}} 条评论</span>
            <span class="answers" v-if="post.count.answers">{{post.count.answers}} 条回复</span>
            <span class="likes" v-if="post.count.likes">{{post.count.likes}} 人赞</span>
            <span class="collects" v-if="post.count.collects">{{post.count.collects}} 人收藏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
          user_avatar: "https://img.haosuzhou.com/4fbb8bc2-36fd-4eec-813c-6de619025e94.gif?imageMogr2/crop/!234x234a6a11/thumbnail/!200/quality/90",
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
    };
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;
  text-align: left;

  .post-list {
    .post {
      padding: 20px 20px 5px 20px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #ffffff;

      &:hover{
        cursor: pointer;
      }

      .post-header {
        display: flex;
        flex-direction: row;
        align-items: center;

        .header-left {
          .avatar {
            height: 45px;
            width: 45px;
            border-radius: 50%;
          }
        }

        .header-right {
          padding: 2px 15px;

          a{
            .name {
              height: 18px;
              line-height: 18px;
              font-size: 14px;
              font-weight: bold;
              color: #1c1e25 !important;

              &:hover{
                text-decoration: underline;
              }
            }
          }

          .display {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            font-weight: bold;

            
            .topic {
              font-size: 12px;
              color: #333333 !important;

              &:hover {
                text-decoration: underline;
              }

              &:after {
                vertical-align: center;
                font-size: 8px;
                margin: 0 8px 0 8px;
                content: "\2022";
              }
            }

            .datetime {
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }

      .post-content{
        padding: 5px 0;

        .post-title{
          color: #1c1e25 !important;
          font-size: 16px;
          font-weight: bold;
          padding-bottom: 5px;

          &:hover{
            text-decoration: underline;
          }
        }

        .post-summary{
          font-size: 14px;
        }

        .statistics{
          padding: 5px 0 0 0;

          .reads,
          .comments,
          .answers,
          .likes,
          .collects{
            font-size: 14px;
            color: #999999;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>
