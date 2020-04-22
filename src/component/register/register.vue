<template>
  <div class="container">
    <div class="main-container">
      <img class="close-btn" src="../../common/img/close.png" @click="backPrev" />
      <div class="header">PPAP</div>
      <div class="main">
        <!-- <div class="name">
          <span>昵称：</span>
          <img src="../../common/img/nick_name.png" alt="">
          <input type="text" v-model="name" @keyup.enter="register" placeholder="请输入昵称" />
        </div> -->
        <!-- <div class="account">
          <span>账号：</span>
          <img src="../../common/img/account.png" alt="">
          <input type="text" v-model="account" @keyup.enter="register" placeholder="请输入账号" />
        </div> -->
        <div class="email">
          <!-- <span>邮箱：</span> -->
          <img src="../../common/img/email.png" alt="">
          <input type="text" v-model="email" @keyup.enter="register" placeholder="请输入邮箱" />
        </div>
        <div class="password">
          <!-- <span>密码：</span> -->
          <img src="../../common/img/password.png" alt="">
          <input type="password" v-model="password" @keyup.enter="register" placeholder="请输入密码" />
        </div>
        <div class="verify">
          <!-- <span>验证码：</span> -->
          <img src="../../common/img/verify.png" alt="">
          <input type="text" v-model="verify" @keyup.enter="register" placeholder="请输入验证码" />
          <div class="verify-btn" @click="getVerify">获取</div>
        </div>
        <div class="login">
          <div @click="register">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, getVerify } from 'api/user'
import sha1 from 'crypto-js/sha1'
import md5 from 'crypto-js/md5'
import swal from 'sweetalert'

export default {
  data(){
    return {
      name: '',
      account: '',
      email: '',
      verify: '',
      password: ''
    }
  },
  methods: {
    register(){
      if(this.email.trim() === ''){
        swal({
          title: '邮箱不能为空'
        })
        return
      }
      if(this.verify.trim() === ''){
        swal({
          title: '验证码不能为空'
        })
        return
      }
      if(this.password.trim() === ''){
        swal({
          title: '密码不能为空'
        })
        return
      }
      let data = {
        name: this.name,
        email: this.email.trim(),
        code: this.verify,
        password: md5(sha1(this.password).toString()).toString()
      }
      register(data).then(response => {
        if(response.data.status === 200){
          swal({
            title: '注册成功'
          })
          this.$router.go(-1)
        }else{
          swal({
            title: response.data.message
          })
        }
      })
    },
    backPrev(){
      this.$router.go(-1)
    },
    getVerify(){
      if(this.email.trim() == ''){
        swal({
          title: '请输入邮箱'
        })
        return
      }
      getVerify(this.email.trim()).then(response => {
        if(response.data.status == 200){
          swal({
            title: response.data.message
          })
        }
      })
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
  background-image url('https://img-bcy-qn.pstatp.com/user/1798447718469171/item/web/c0rmz/b08cc7c01bdd11ea8dd4bfcb234d5a5c.jpg')
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

      .name, .account, .email, .password, .verify {
        position relative
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
          // border 1px solid #999
          // border-radius 8px
          font-size 14px
          background none
        }

        .verify-btn {
          position absolute
          top 10px
          right 10px
          background-color #ecf5ff
          color #409eff
          border 1px solid #d9ecff
          cursor pointer
          transition all 0.3s
          padding 4px 20px
          border-radius 5px

          &:active {
            opacity 0.5
          }
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