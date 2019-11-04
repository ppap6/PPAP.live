<template>
  <div class="container">
    <div class="post-list">
      <div class="post" v-for="post in itemList" :key="post.post_id">
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
  props: ["postList"],
  data() {
    return {
      itemList: this.postList
    };
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;

  .post-list {
    text-align: left;
    
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
