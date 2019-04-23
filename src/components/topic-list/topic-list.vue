<template>
  <div class="container">
    <div class="topic-list">
      <div class="fixed-label">
        <span class="active">全部</span>
        <span>优选</span>
      </div>
      <div class="level1-topic">
        <span>职业</span>
        <div class="level2-topic">
          <span>程序员</span>
          <span>产品经理</span>
          <span>设计师</span>
          <span>教师</span>
          <span>演员</span>
          <span>明星</span>
        </div>
      </div>
      <div class="level1-topic">
        <span>技术</span>
        <div class="level2-topic">
          <span>React</span>
          <span>Vue</span>
          <span>React Native</span>
          <span>Angular</span>
          <span>小程序</span>
          <span>NodeJS</span>
          <span>JavaScript</span>
          <span>Go</span>
          <span>Flutter</span>
          <span>TypeScript</span>
          <span>Webpack</span>
        </div>
      </div>
      <div class="level1-topic">
        <span>生活</span>
        <div class="level2-topic">
          <span>音乐</span>
          <span>动漫</span>
          <span>电影</span>
          <span>旅游</span>
          <span>美食</span>
          <span>健康</span>
          <span>运动</span>
          <span>交友</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          title: "我爱盐酥鸡",
          intro: "一个记录成长轨迹的博客",
          href: "https://jwchan.cn"
        },
        {
          title: "jwchan1996",
          intro:
            "Always remain eager to learn，these will push you up in your career.",
          href: "https://github.com/jwchan1996"
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  text-align: left;
}

.topic-list {
  padding: 20px 10px;
}

.fixed-label{
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.fixed-label>span{
  font-size: 14px;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.level1-topic {
  padding: 5px 0;
}

.level2-topic {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.level1-topic>span {
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.level2-topic>span {
  font-size: 14px;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.active{
  color: #FFFFFF;
  background-color: #4170EA !important;
}

.link {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
}

.link-title {
  font-size: 12px;
  font-weight: bold;
  color: #171717;
}

.link-intro {
  font-size: 12px;
  color: #171717;
}
.link a:hover {
  text-decoration: underline;
}
</style>
