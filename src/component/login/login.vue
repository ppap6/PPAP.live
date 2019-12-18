<template>
  <div class="container">
    <div class="main-container">
      <img class="close-btn" src="../../common/img/close.png" @click="backPrev" />
      <div class="header">PPAP</div>
      <div class="main">
        <div class="account">
          <!-- <span>账号：</span> -->
          <img src="../../common/img/account.png" alt="">
          <input type="text" v-model="account" @keyup.enter="login" placeholder="请输入账号" />
        </div>
        <div class="password">
          <!-- <span>密码：</span> -->
          <img src="../../common/img/password.png" alt="">
          <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码" />
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
  background-image url('https://img-bcy-qn.pstatp.com/user/1798447718469171/item/web/c0rn0/76b35ec01c8b11eaa5b5f16b18057a86.jpg')
  background-position center
  background-repeat no-repeat
  background-size cover

  .main-container {
    position relative
    border-radius 5px
    margin-bottom 150px
    padding 20px 20px
    background-color rgba(255,255,255,0.95)
    // box-shadow 10px 10px 10px #ddd

    .close-btn {
      width 20px
      height 20px
      position absolute
      top 15px
      right 15px
      cursor pointer
      transition all .2s linear

      &:hover {
        transform rotate(180deg)
      }
    }

    .header {
      width 320px
      padding 15px 20px
      font-weight bold
      font-size 26px
      color #FFD100
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
        border-bottom 1px dashed #cdcdcd

        img {
          height 30px
          width 30px
        }

        input {
          width 220px
          padding 8px 10px
          color #515151
          // border-bottom 1px solid #999
          // border-radius 8px
          font-size 14px
          background none
        }
      }

      .password {
        display flex
        align-items center
        justify-content center
        padding 10px 0
        margin auto
        border-bottom 1px dashed #cdcdcd

        img {
          height 30px
          width 30px
        }

        input {
          width 220px
          padding 8px 10px
          color #515151
          // border-bottom 1px solid #999
          // border-radius 8px
          font-size 14px
          background none
        }
      }
    }

    .login {
      div {
        width 300px
        margin 30px auto 8px
        color #313131
        font-size 22px
        padding 10px 10px
        border-radius 32px
        // background-color #4170EA
        background-color #FFD100
        cursor pointer
        transition all .1s linear

        &:hover {
          box-shadow 0 0 8px #bbb
          opacity 0.8
        }
      }
    }

  }

}
</style>