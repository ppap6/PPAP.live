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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
.container {
  display: flex;
  flex-direction column
  align-items center
  justify-content center
}
</style>