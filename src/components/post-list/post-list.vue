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
            <div class="dispaly">
              <router-link to="/topic/555">
                <span class="topic">产品经理</span>
              </router-link>
              <span class="datetime">02月22日</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link to="/post-detail">
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
      <div class="post">
        <div class="post-header">
          <div class="header-left">
            <router-link to="/user/666">
              <img class="avatar" src="https://img.haosuzhou.com/4fbb8bc2-36fd-4eec-813c-6de619025e94.gif?imageMogr2/crop/!234x234a6a11/thumbnail/!200/quality/90" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link to="/user/666">
              <p class="name">梁虚天</p>
            </router-link>
            <div class="dispaly">
              <router-link to="/topic/555">
                <span class="topic">产品经理</span>
              </router-link>
              <span class="datetime">03月22日</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link to="/post-detail">
            <div class="post-title">这是我的第二个帖子？？？</div>
          </router-link>
          <div class="post-summary">这是这个帖子内容的一部分</div>
          <div class="statistics">
            <span class="reads">19 次阅读</span>
            <span class="comments">1 条评论</span>
            <span class="answers">2 条回复</span>
            <span class="likes">1 人赞</span>
            <span class="collects"></span>
          </div>
        </div>
      </div>
      <div class="post">
        <div class="post-header">
          <div class="header-left">
            <router-link to="/user/666">
              <img class="avatar" src="https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link to="/user/666">
              <p class="name">陆明恒</p>
            </router-link>
            <div class="dispaly">
              <router-link to="/topic/555">
                <span class="topic">产品经理</span>
              </router-link>
              <span class="datetime">03月28日</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link to="/post-detail">
            <div class="post-title">这是我的第san个帖子？？？</div>
          </router-link>
          <div class="post-summary">这是这个帖子内容的一部分</div>
          <div class="statistics">
            <span class="reads">19 次阅读</span>
            <span class="comments">1 条评论</span>
            <span class="answers">2 条回复</span>
            <span class="likes"></span>
            <span class="collects"></span>
          </div>
        </div>
      </div>
      <div class="post">
        <div class="post-header">
          <div class="header-left">
            <router-link to="/user/666">
              <img class="avatar" src="https://img.xiaoduyu.com/Fk2Boi_rCu0cHzXGU3v14oy8Z1sR?imageMogr2/auto-orient/thumbnail/!200/quality/90" alt>
            </router-link>
          </div>
          <div class="header-right">
            <router-link to="/user/666">
              <p class="name">周胜军</p>
            </router-link>
            <div class="dispaly">
              <router-link to="/topic/555">
                <span class="topic">产品经理</span>
              </router-link>
              <span class="datetime">04月12日</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link to="/post-detail">
            <div class="post-title">这是我的第si个帖子？？？</div>
          </router-link>
          <div class="post-summary">这是这个帖子内容的一部分</div>
          <div class="statistics">
            <span class="reads">1 次阅读</span>
            <span class="comments">1 条评论</span>
            <span class="answers"></span>
            <span class="likes">1 人赞</span>
            <span class="collects"></span>
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

<style scoped>
.container {
  /* background-color: hsl(0, 0%, 100%); */
  border-radius: 5px;
  text-align: left;
}

.post {
  padding: 20px 20px 5px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffffff;
}

.post:hover{
  cursor: pointer;
}

.post-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-right {
  padding: 2px 15px;
}

.post-header .avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.header-right .name {
  height: 18px;
  line-height: 18px;
  font-size: 14px;
  font-weight: bold;
  color: #1c1e25 !important;
}

.header-right .name:hover {
  text-decoration: underline;
}

.header-right .display {
  height: 18px;
  line-height: 18px;
  font-size: 14px;
  font-weight: bold;
}

.header-right .topic {
  font-size: 12px;
  color: #333333 !important;
}

.header-right .topic:hover {
  text-decoration: underline;
}

.header-right .topic:after {
  vertical-align: center;
  font-size: 8px;
  margin: 0 8px 0 8px;
  content: "\2022";
}

.header-right .datetime {
  font-size: 12px;
  color: #999999;
}

.post-content{
  padding: 5px 0;
}

.post-title{
  color: #1c1e25 !important;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 5px;
}

.post-title:hover{
  text-decoration: underline;
}

.post-summary{
  font-size: 14px;
}

.statistics{
  /* background-color: aqua; */
  padding: 5px 0 0 0;
}

.reads,
.comments,
.answers,
.likes,
.collects{
  font-size: 14px;
  color: #999999;
  margin-right: 15px;
}
</style>
