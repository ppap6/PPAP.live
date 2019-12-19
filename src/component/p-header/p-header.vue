<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <router-link to="/" class="pc-logo">
          <img class="logo" src="../../common/img/logo.png" alt>
        </router-link>
        <div>
          <a @click="goSearch">
            <img class="search-icon" src="../../common/img/search.png" alt="">
          </a>
          <input class="search-input" type="text" v-model="keywords" @keyup.enter="goSearch" placeholder="搜索">
        </div> 
      </div>
      <div class="header-right">
        <ul v-if="token !== undefined">
          <li>
            <router-link to="/follow">关注</router-link>
          </li>
          <li>
            <router-link to="/new-post">发帖</router-link>
          </li>
          <li>
            <router-link to="/notice">通知</router-link>
          </li>
          <!-- <li>
            <router-link to="/chats">私信</router-link>
          </li> -->
          <li>
            <router-link :to="`/user/${uid}`">
              <img class="avatar" :src="avatar" alt="">
              <span>{{uname}}</span>
            </router-link>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a @click="goRegister">注册</a>
          </li>
          <li>
            <a @click="goLogin">登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLoginStatus } from 'api/user'
import { getStorage, setStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  data(){
    return {
      keywords: '',
      uid: 0,
      avatar: '',
      uname: ''
    }
  },
  computed: {
    token(){
      this.uid = getStorage('user').uid
      this.avatar = getStorage('user').avatar
      this.uname = getStorage('user').uname
      return this.$store.state.token
    }
  },
  watch: {
    $route(to, from){
      if(from.path.includes('/search/posts') && (!to.path.includes('/search/users') && !to.path.includes('/search/posts'))){
        this.keywords = ''
      }
      if(from.path.includes('/search/users') && (!to.path.includes('/search/posts') && !to.path.includes('/search/users'))){
        this.keywords = ''
      }
    }
  },
  created(){
    this.getUserLoginStatus()
  },
  methods: {
    goLogin(){
      if(this.$route.path == '/register' || this.$route.path == '/login'){
        console.log('replace')
        this.$router.replace({
          path: '/login'
        })
      }else{
        console.log('push')
        this.$router.push({
          path: '/login'
        })
      }
    },
    goRegister(){
      if(this.$route.path == '/register' || this.$route.path == '/login'){
        console.log('replace')
        this.$router.replace({
          path: '/register'
        })
      }else{
        console.log('push')
        this.$router.push({
          path: '/register'
        })
      }
    },
    goSearch(){
      if(this.keywords.trim() == ''){
        swal({
          title: '请输入搜索关键字'
        })
        return
      }
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keywords.trim()
        }
      })
    },
    getUserLoginStatus(){
      getUserLoginStatus().then(response => {
        if(response.data.status === 200){
          //读写storage
          let user = getStorage('user')
          user.count = response.data.message.count
          setStorage('user', user)
          //更新数据
          //更改state.token的状态
          this.$store.commit('resetToken', user.token)
        }else if(response.data.status === 401){
          //不作处理
        }
      }).catch(error => {

      })
    }
  }
};
</script>

<style scoped lang="stylus">
.header {
  position fixed
  top 0
  left 0
  right 0
  z-index 10
  padding 2px 10px
  background #ffffff
  box-shadow 0 2px 10px 0 rgba(4, 21, 39, 0.2), 0 1px rgba(4, 21, 39, 0.2)

  .container {
    max-width 1180px
    display flex
    flex-direction row
    align-items center
    justify-content space-between
    margin auto

    .header-left {
      display flex
      flex-direction row
      align-items center

      .pc-logo {
        font-size 0

        .logo {
          width 60px
          height 28px
          margin 8px 10px
          border-radius 5px
        }
      }

      >div{
        position relative

        .search-icon {
          position absolute
          width 20px
          height 20px
          top 6px
          right 6px
          cursor pointer
        }

        .search-input {
          height 32px
          width 200px
          color #515151
          border-radius 10px
          line-height 32px
          padding 0 36px 0 10px
          font-size 14px
          background #f2f2f2

          &hover {
            background #ececec
          }
        }
       
      }
    }

    .header-right {
      display flex
      flex-direction row
      align-items center

      >ul {
        display flex
        flex-direction row
        align-items center

        >li {
          font-size 14px
          padding 10px
          list-style none

          >a {
            cursor pointer
            display flex
            flex-direction row
            align-items center
            justify-content center

            .avatar {
              width 24px
              height 24px
              border-radius 50%
              padding-right 5px
            }

          }
        }

      }
    }
  }
}
</style>