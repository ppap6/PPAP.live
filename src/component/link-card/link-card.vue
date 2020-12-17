<template>
  <div class="container">
    <div class="title">
      <p>友情链接</p>
    </div>
    <div class="link-list">
      <div class="link" v-for="item in linkList" :key="item.id">
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
          id: 1,
          title: "飘香豆腐的博客",
          intro: "vuepress 博客，记录 bug 的诞生",
          href: "https://jwchan.cn"
        },
        {
          id: 2,
          title: "飘香豆腐的主页",
          intro: "时间过得可真快啊...",
          href: "https://github.com/jwchan1996"
        },
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.container {
  background-color hsl(0, 0%, 100%)
  border-radius 5px

  .title {
    width 100%
    height 36px
    display flex
    flex-direction column
    justify-content center
    border-bottom 1px solid #ececec

    p {
      height 16px
      line-height 16px
      text-align left
      padding 0 10px
      margin-left 10px
      font-size 14px
      border-left 3px solid #009688
    }
  }

  .link-list {
    padding 10px

    .link {
      text-align left
      display flex
      flex-direction row
      align-items center
      padding 4px 0

      .link-title {
        font-size 12px
        font-weight bold
        color #171717
      }

      .link-intro{
        font-size 12px
        color #171717
      }

      a:hover {
        text-decoration underline
      }
    }
  }
}
</style>
