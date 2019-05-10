<template>
  <div class="container">
    <router-link to="/user/666">
      <img class="profile" :src="avatar" alt>
    </router-link>
    <router-link to="/user/666">
      <p class="name">{{name}}</p>
    </router-link>
    <div class="user-information">
      <div class="following">
        <div class="counts">2</div>
        <div class="text">关注</div>
      </div>
      <div class="followers">
        <div class="counts">66</div>
        <div class="text">粉丝</div>
      </div>
      <div class="posts">
        <div class="counts">10</div>
        <div class="text">发帖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: "https://jwchan.cn/images/avatar.jpg",
      name: "Jwchan"
    }
  }
}
</script>

<style scoped>
  .container{
    padding: 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
  }

  .profile{
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }

  .name{
    color: #171717;
    font-weight: bold;
  }

  .user-information{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .following,
  .followers,
  .posts{
    width: 20%;
    margin: 10px;
  }

  .counts{
    color: #666666;
    font-size: 14px;
  }

  .text{
    color: #999999;
    font-size: 12px;
  }
</style>
