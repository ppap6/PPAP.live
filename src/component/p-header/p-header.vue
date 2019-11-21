<!--
 * @Author: jwchan1996
 * @Date: 2019-05-10 22:55:01
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-05-10 22:55:01
 -->
<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <router-link to="/" class="pc-logo">
          <img class="logo" src="../../common/img/logo.png" alt>
        </router-link>
        <div>
          <router-link to="/search">
            <img class="search-icon" src="../../common/img/search.png" alt="">
          </router-link>
          <input class="search-input" type="text" placeholder="搜索">
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
            <router-link to="/notice/用户id">通知</router-link>
          </li>
          <li>
            <router-link to="/chats">私信</router-link>
          </li>
          <li>
            <router-link to="/user/666">jwchan1996</router-link>
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
import { getStorage } from 'common/js/localstorage'

export default {
  data(){
    return {
      
    }
  },
  computed: {
    token(){
      console.log(getStorage('user').token)
      // return getStorage('user').token
      return this.$store.state.token
    }
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
    }
  }
};
</script>

<style scoped lang="stylus">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 2px 10px;
  background: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(4, 21, 39, 0.2), 0 1px rgba(4, 21, 39, 0.2);

  .container {
    max-width: 1180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    .header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .pc-logo {
        font-size: 0;

        .logo {
          width: 60px;
          height: 28px;
          margin: 8px 10px;
          border-radius: 5px;
        }
      }

      >div{
        position: relative;

        .search-icon {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 6px;
          right: 6px;
          cursor: pointer;
        }

        .search-input {
          height: 32px;
          width: 200px;
          color: #515151;
          border-radius: 10px;
          line-height: 32px;
          padding: 0 36px 0 10px;
          font-size: 14px;
          background: #f2f2f2;

          &hover {
            background: #ececec;
          }
        }
       
      }
    }

    .header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      >ul {
        display: flex;
        flex-direction: row;
        align-items: center;

        >li {
          font-size: 14px;
          padding: 10px;
          list-style: none;

          >a {
            cursor: pointer;
          }
        }

      }
    }
  }
}
</style>