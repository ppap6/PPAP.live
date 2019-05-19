<template>
  <div class="container">
    <div class="post-list">
      <div class="post">
        <div class="post-header">
          <div class="header-left">
            <router-link to="/user/666">
              <img class="avatar" src="https://jwchan.cn/images/avatar.jpg" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link to="/user/666">
              <p class="name">jwchan</p>
            </router-link>
            <div class="display">
              <router-link to="/topic/555">
                <span class="topic">产品经理</span>
              </router-link>
              <span class="datetime">02月22日</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link to="/post/帖子id">
            <div class="post-title">这是我的第一个帖子？？？</div>
          </router-link>
          <div class="post-summary">这是这个帖子内容的一部分</div>
          <div class="statistics">
            <span class="reads">159 次阅读</span>
            <span class="comments">6 条评论</span>
            <span class="answers">2 条回复</span>
            <span class="likes">2 人赞</span>
            <span class="collects">1 人收藏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
