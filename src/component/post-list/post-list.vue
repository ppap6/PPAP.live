<template>
  <div class="container">
    <div class="post-list">
      <div class="post" v-for="post in postList" :key="post.id">
        <div class="post-header">
          <div class="header-left">
            <router-link :to="`/user/${post.uid}`" v-if="!useInPerson">
              <img class="avatar" :src="post.avatar" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link :to="`/user/${post.uid}`" v-if="!useInPerson">
              <p class="name">{{post.uname}}</p>
            </router-link>
            <div class="display">
              <router-link :to="`/topic/${post.topic_id}`">
                <span class="topic">{{post.topic_name}}</span>
              </router-link>
              <span class="datetime">{{post.create_time}}</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link :to="`/post/${post.id}`">
            <div class="post-title">{{post.title}}</div>
          </router-link>
          <div class="post-summary" v-if="!useInPerson" v-html="post.content.slice(0,40) + '…'"></div>
          <div class="statistics">
            <span class="reads" v-if="post.pv">{{post.pv}} 阅读</span>
            <span class="comments" v-if="post.comments">{{post.comments}} 评论</span>
            <span class="answers" v-if="post.answers">{{post.answers}} 回复</span>
            <span class="likes" v-if="post.likes">{{post.likes}} 赞</span>
            <span class="collects" v-if="post.collects">{{post.collects}} 收藏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['postList', 'useInPerson'],
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;

  .post-list {
    text-align: left;
    
    .post {
      padding: 10px 20px 5px 20px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #ffffff;

      .post-header {
        display: flex;
        flex-direction: row;
        align-items: center;

        .header-left {
          .avatar {
            height: 45px;
            width: 45px;
            border-radius: 50%;
            padding-right: 10px;
          }
        }

        .header-right {
          padding: 2px 15px 2px 0;

          a{
            .name {
              height: 18px;
              line-height: 18px;
              font-size: 14px;
              color: #444;

              &:hover{
                text-decoration: underline;
              }
            }
          }

          .display {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            
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
          color: #313131 !important;
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
            font-size: 12px;
            color: #999999;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
