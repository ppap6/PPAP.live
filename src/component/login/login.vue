<template>
  <div class="container">
    <div class="header">用户登录</div>
    <div class="main">
      <div class="account">
        <span>账号：</span>
        <input type="text" placeholder="请输入账号……" />
      </div>
      <div class="password">
        <span>密码：</span>
        <input type="password" placeholder="请输入密码……" />
      </div>
      <div class="login">
        <div>登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
.container {
  height calc(100vh - 80px)
  background-color #ececec
  display flex
  flex-direction column
  align-items center
  justify-content center

  .header {
    width 320px
    padding 15px 20px
    background-color #fff
  }

  .main {
    width 320px
    padding 0 20px 15px 20px
    background-color #fff
    margin-bottom 150px

    .account {
      display flex
      align-items center
      justify-content center
      padding 10px 0
      margin auto
      // background-color #f2f2f2

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
      // background-color #f2f2f2

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
</style>