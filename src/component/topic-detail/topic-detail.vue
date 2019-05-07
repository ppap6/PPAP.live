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
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我是话题详情组件',
      topic: {
        avatar: "https://img.xiaoduyu.com/885719a9-f083-47df-853a-a003764f4017.jpg?imageMogr2/crop/!400x400a0a0/thumbnail/!200",
        name: "Vue",
        intro: "Vue是一个构建数据驱动的 web 界面的渐进式框架。"
      }
    }
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
