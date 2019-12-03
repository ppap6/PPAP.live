<template>
  <div class="container">
    <div class="main-container">
      <img class="close-btn" src="../../common/img/close.png" @click="backPrev" />
      <div class="header">用户登录</div>
      <div class="main">
        <div class="account">
          <span>账号：</span>
          <input type="text" v-model="account" @keyup.enter="login" placeholder="请输入账号……" />
        </div>
        <div class="password">
          <span>密码：</span>
          <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码……" />
        </div>
        <div class="login">
          <div @click="login">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user'
import { setStorage } from 'common/js/localstorage'
import sha1 from 'crypto-js/sha1'
import md5 from 'crypto-js/md5'

export default {
  data(){
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login(){
      if(this.account.trim() === ''){
        alert('账号不能为空')
        return
      }
      if(this.password.trim() === ''){
        alert('密码不能为空')
        return
      }
      let data = {
        account: this.account,
        password: md5(sha1(this.password).toString()).toString()
      }
      login(data).then(response => {
        if(response.data.status === 200){
          setStorage('user', response.data.user)
          alert('登录成功')
          this.$router.go(-1)
          //更改state.token状态、
          this.$store.commit('resetToken', response.data.user.token)
        }else{
          console.log(response.data)
          alert(response.data.message)
        }
      })
    },
    backPrev(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="stylus">
.container {
  width 100vw
  height calc(100vh - 80px)
  background-color #ececec
  display flex
  flex-direction column
  align-items center
  justify-content center
  background-image url('https://jwchan.cn/images/GDG2018/dance.jpg')
  background-position center
  background-repeat no-repeat
  background-size cover

  .main-container {
    position relative
    border-radius 5px
    margin-bottom 150px
    background-color rgba(255,255,255,0.92)
    box-shadow 10px 10px 10px #ddd

    .close-btn {
      width 20px
      height 20px
      position absolute
      top 10px
      right 10px
      cursor pointer
    }

    .header {
      width 320px
      padding 15px 20px
    }

    .main {
      width 320px
      padding 0 20px 15px 20px

      .account {
        display flex
        align-items center
        justify-content center
        padding 10px 0
        margin auto

        input {
          width 200px
          padding 8px 10px
          border 1px solid #999
          border-radius 8px
          font-size 14px
        }
      }

      .password {
        display flex
        align-items center
        justify-content center
        padding 10px 0
        margin auto

        input {
          width 200px
          padding 8px 10px
          border 1px solid #999
          border-radius 8px
          font-size 14px
        }
      }
    }

    .login {
      div {
        width 200px
        margin 10px auto 8px
        color #fff
        padding 5px 10px
        border-radius 20px
        background-color #4170EA
        cursor pointer
      }
    }

  }

}
</style>