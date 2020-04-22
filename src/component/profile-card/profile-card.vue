<template>
  <div class="profile-card">
    <div class="user-bg" :style="`background-image: url(${author.bg})`"></div>
    <router-link :to="`/user/${author.id}`" v-if="author.avatar != '' && author.avatar != null">
      <img class="profile" :src="author.avatar" alt>
    </router-link>
    <img class="profile" @click="goLogin" src="~common/img/avatar.gif" alt v-if="author.avatar == '' || author.avatar == null">
    <router-link :to="`/user/${author.id}`" v-if="author.id != 0">
      <p class="name">{{author.name}}</p>
    </router-link>
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
      background-color #565a63
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
