<template>
  <div class="container">
    <div class="post-list">
      <PostList :postList="postList"></PostList>
    </div>
  </div>
</template>

<script>
import PostList from "component/post-list/post-list"

export default {
  data() {
    return {
      postList: [
        {
          user_id: 1,
          user_name: "Jwchan",
          user_avatar: "https://jwchan.cn/images/avatar.jpg",
          topic_id: 1,
          topic_name: "Vue",
          post_id: 1,
          post_title: "深入浅出 webpack 原理",
          post_content: "这是这个帖子内容的一部分",
          datetime: "02月22日",
          count: {
            reads: 159,
            comments: 6,
            answers: 2,
            likes: 2,
            collects: 1
          }
        }
      ]
    };
  },
  components: {
    PostList
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;
  text-align: left;

  .post {
    padding: 20px 20px 5px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;

    &:hover{
      cursor: pointer;
    }
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

      a {
        .name {
          height: 18px;
          line-height: 18px;
          font-size: 14px;
          font-weight: bold;
          color: #1c1e25 !important;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .display {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;

        a {
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

    a {
      .post-title{
        color: #1c1e25 !important;
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;

        &:hover{
          text-decoration: underline;
        }
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
</style>
