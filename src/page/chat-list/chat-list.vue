<template>
  <div class="chat-list">
    <h1>{{ msg }}</h1>
    <template v-for="item in chatList">
      <div class="chat-item">
        <img :src="item.avatar" alt="头像">
        <div class="detail">
          <div class="name">{{item.name}}</div>
          <div class="last-message">{{item.last_message}}</div>
        </div>
        <div class="last-datetime">{{item.last_datetime}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我是私信列表组件',
      chatList: [
        {
          id: 1,
          name: '大虫子',
          avatar: 'https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90',
          last_message: '666啊老哥 🍰',
          last_datetime: '2019-04-28 15:30:22'
        },
        {
          id: 2,
          name: '梁虚天',
          avatar: 'https://img.xiaoduyu.com/FklxjW19iOahN2nBRdVNvpyaPeao?imageMogr2/thumbnail/!200/quality/90',
          last_message: '我是虚天啊，老铁还记得我吗 🍰',
          last_datetime: '2019-04-29 10:30:22'
        },
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.chat-list{
  max-width 720px
  margin auto

  h1{
    padding 10px
  }

  .chat-item{
    position relative
    background-color #FFFFFF
    border-radius 5px
    margin-bottom 10px
    padding 10px 20px
    display flex
    flex-direction row
    align-items center
    cursor pointer

    img{
      width 50px
      height 50px
      border-radius 50%
      flex-shrink 0
    }

    .detail{
      padding 0 10px
      text-align left

      .name{
        font-size 16px
        color #333333
      }

      .last-message{
        font-size 14px
        color #797979
      }
    }

    .last-datetime{
      position absolute
      top 10px
      right 20px
      color #797979
      font-size 14px
    }
  }
}
</style>
