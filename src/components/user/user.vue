<template>
  <div class="user-center">
    <header>
      <div class="header-left">
        <img class="avatar" src="https://jwchan.cn/images/avatar.jpg" alt>
      </div>
      <div class="header-right">
        <p class="name">Jwchan</p>
        <p class="join-date">加入于 10 天前</p>
      </div>
    </header>
    <nav>
      <span class="posts" @click="selectNav('posts')" :class="{active: navName === 'posts'}">帖子 1</span>
      <span class="followers" @click="selectNav('followers')" :class="{active: navName === 'followers'}">粉丝 2</span>
      <span class="follow-peoples" @click="selectNav('follow-peoples')" :class="{active: navName === 'follow-peoples'}">关注的人 1</span>
      <span class="follow-posts" @click="selectNav('follow-posts')" :class="{active: navName === 'follow-posts'}">关注的帖子 1</span>
      <span class="follow-topics" @click="selectNav('follow-topics')" :class="{active: navName === 'follow-topics'}">关注的话题 2</span>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navName: "posts"
    }
  },
  methods:{
    selectNav(str){
      this.navName = str
    }
  }
};
</script>

<style scoped>
.user-center {
  max-width: 720px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 5px;
}

header {
  display: flex;
  flex-direction: row;
  align-items: top;
  padding: 20px;
}

.header-left .avatar {
  height: 100px;
  width: 100px;
  margin: 0 10px;
  border-radius: 50%;
}

.header-right {
  padding: 2px 15px;
}

.header-right .name {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}

.header-right .join-date {
  text-align: left;
  font-size: 12px;
  color: #999999;
}

nav {
  color: #515151;
  text-align: left;
  padding: 10px 20px;
}

.posts,
.followers,
.follow-peoples,
.follow-posts,
.follow-topics {
  font-size: 14px;
  padding: 10px 15px;
  background-color: #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
  cursor: pointer;
}

.active{
  color: #4170EA;
  border-bottom: 3px solid #4170EA;
}
</style>
