<template>
  <div class="container">
    <router-link :to="`/user/${uid}`" v-if="token !== undefined">
      <img class="profile" :src="avatar" alt>
    </router-link>
    <img class="profile" @click="goLogin" src="../../common/img/avatar.gif" alt v-if="token === undefined">
    <router-link :to="`/user/${uid}`" v-if="token !== undefined">
      <p class="name">{{uname}}</p>
    </router-link>
    <p class="name" @click="goLogin" v-if="token === undefined">未登录</p>
    <div class="user-information" v-if="token !== undefined">
      <div class="following">
        <div class="counts">{{follows}}</div>
        <div class="text">关注</div>
      </div>
      <div class="followers">
        <div class="counts">{{fans}}</div>
        <div class="text">粉丝</div>
      </div>
      <div class="posts">
        <div class="counts">{{posts}}</div>
        <div class="text">发帖</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage } from 'common/js/localstorage'

export default {
  data() {
    return {
      uid: 0,
      avatar: '',
      uname: '',
      follows: 0,
      fans: 0,
      posts: 0
    }
  },
  computed: {
    token(){
      this.uid = getStorage('user').uid == undefined ? 0 : getStorage('user').uid
      this.avatar = getStorage('user').avatar == undefined ? 0 : getStorage('user').avatar
      this.uname = getStorage('user').uname == undefined ? 0 : getStorage('user').uname
      this.follows = getStorage('user').count == undefined ? 0 : getStorage('user').count.follows
      this.fans = getStorage('user').count == undefined ? 0 : getStorage('user').count.fans
      this.posts = getStorage('user').count == undefined ? 0 : getStorage('user').count.posts
      return this.$store.state.token
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
  .container{
    padding 15px
    background-color #FFFFFF
    border-radius 5px

    .profile{
      height 80px
      width 80px
      border-radius 50%
      cursor pointer
    }

    .name{
      color #555555
      font-weight bold
      cursor pointer
    }

    .user-information{
      display flex
      flex-direction row
      align-items center
      justify-content center

      .following,
      .followers,
      .posts{
        width 20%
        margin 10px

        .counts{
          color #666666
          font-size 14px
        }

        .text{
          color #999999
          font-size 12px
        }
      }
    }
  }
</style>
