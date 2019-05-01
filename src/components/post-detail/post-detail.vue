<template>
  <div class="post-detail">
    <h1>{{ msg }}</h1>
    <div class="post-header">
      <img :src="post.avatar" alt="头像">
      <div class="information">
        <div class="name">{{post.name}}</div>
        <div class="last-datetime">{{post.last_datetime}}</div>
      </div>
    </div>
    <div class="post-content">
      <div class="title">{{post.title}}</div>
      <div class="content">{{post.content}}</div>
    </div>
    <div class="post-footer">
      <div class="left">
        <span>44 次阅读</span>
        <span>3 条评论</span>
        <span>6 条回复</span>
      </div>
      <div class="righ">
        <span>点赞</span>
        <span>收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
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
    border-radius: 5px;
    margin-bottom: 10px;
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
      }

      .last-datetime {
        font-size: 14px;
        color: #797979;
      }
    }
  }
}
</style>