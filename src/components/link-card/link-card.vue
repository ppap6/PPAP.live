<template>
  <div class="container">
    <div class="title">
      <p>友情链接</p>
    </div>
    <div class="link-list">
      <div class="link" v-for="item in linkList">
        <a :href="item.href" target="_blank">
          <p class="link-title">{{item.title}}</p>
          <p class="link-intro">{{item.intro}}</p>
        </a>
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
          intro: "Always remain eager to learn，these will push you up in your career.",
          href: "https://github.com/jwchan1996"
        },
      ]
    };
  }
};
</script>

<style scoped>
.container {
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
}

.title {
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #ececec;
}

.title p {
  height: 16px;
  line-height: 16px;
  text-align: left;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 14px;
  border-left: 3px solid #009688;
}

.link-list {
  padding: 10px;
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

.link-intro{
  font-size: 12px;
  color: #171717;
}
.link a:hover {
  text-decoration: underline;
}
</style>
