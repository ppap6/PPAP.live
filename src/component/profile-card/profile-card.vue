<template>
  <div class="profile-card">
    <div class="user-bg" :style="`background-image: ${author.bg ? 'url('+author.bg+')' : 'none'};background-color: ${author.bg ? 'transparentify' : '#565a63'}`"></div>
    <router-link :to="`/user/${author.id}`" v-if="author.avatar != '' && author.avatar != null">
      <img class="profile" :src="author.avatar" alt>
    </router-link>
    <img class="profile" @click="goLogin" src="~common/img/avatar.gif" alt v-if="author.avatar == '' || author.avatar == null">
    <router-link :to="`/user/${author.id}`" v-if="author.id != 0">
      <p class="name">{{author.name}}</p>
    </router-link>
    <p class="auth-title">
      <img src="~common/img/auth_title.png">
      <span>PPAP创始人、广州黄埔最骚程序员、反冲斗士</span>
    </p>
    <p class="intro" v-if="author.signature">{{author.signature}}</p>
    <div class="user-information">
      <div class="followers">
        <div class="counts">{{count.fans}}</div>
        <div class="text">粉丝</div>
      </div>
      <div class="following">
        <div class="counts">{{count.follows}}</div>
        <div class="text">关注</div>
      </div>
      <div class="posts">
        <div class="counts">{{count.posts}}</div>
        <div class="text">帖子</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage } from 'common/js/localstorage'

export default {
  props: ['user'],
  data() {
    return {
      count: {}
    }
  },
  computed: {
    author(){
      return this.user
    }
  },
  watch: {
    author(){
      this.count = this.author.count
    }
  },
  methods: {
    goLogin(){
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .profile-card{
    position relative 
    padding 0
    background-color #FFFFFF
    border-radius 5px

    .user-bg {
      height 80px
      width 100%
      padding 0
      margin 0
      border-top-left-radius 5px
      border-top-right-radius 5px
      background-size cover
      background-position center center
      // background-color #565a63
      background-color transparentify
      background-repeat no-repeat
    }

    .profile{
      height 64px
      width 64px
      border-radius 50%
      cursor pointer
      border 2px solid #fff
      margin-top -35px
    }

    .name{
      color #555555
      font-size 15px
      font-weight bold
      cursor pointer
      margin 5px 0
    }

    .auth-title {
      display flex
      align-items center
      font-size 14px
      color #515151
      margin 2px 0 0
      padding 0 15px
      text-align center

      img {
        height 28px
        width 28px
        margin-bottom 8px
      }

      span {
        margin 0 4px
        color #f2aa24
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      }
    }

    .intro {
      display flex
      align-items center
      justify-content center
      font-size 14px
      color #515151
      margin 2px 0 0
      padding 0 15px
    }

    .user-information{
      display flex
      flex-direction row
      align-items center
      justify-content center
      border-top 1px solid #ececec
      padding 5px 0
      margin-top 20px
      background-color #fafafa

      .following,
      .followers,
      .posts{
        width 33.3%
        margin 10px

        .counts{
          color #666
          font-size 12px
          margin-bottom 2px
        }

        .text{
          color #777
          font-size 12px
        }
      }
    }
  }
</style>
