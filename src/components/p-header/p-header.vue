<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <router-link to="/" class="pc-logo">
          <img class="logo" src="../../assets/img/logo.png" alt>
        </router-link>
        <input class="search-input" type="text" placeholder="搜索">
      </div>
      <div class="header-right">
        <ul>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 2px 10px;
  background: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(4, 21, 39, 0.2), 0 1px rgba(4, 21, 39, 0.2);
}

.container {
  max-width: 1180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}

.header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pc-logo {
  font-size: 0;
}

.logo {
  width: 60px;
  height: 28px;
  margin: 8px 10px;
  border-radius: 5px;
}

.search-input {
  height: 32px;
  width: 240px;
  border-radius: 10px;
  line-height: 32px;
  padding: 0 10px;
  font-size: 14px;
  background: #f2f2f2;
}
.search-input:hover {
  background: #ececec;
}

.header-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-right ul {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-right ul li {
  font-size: 14px;
  padding: 10px;
}
</style>