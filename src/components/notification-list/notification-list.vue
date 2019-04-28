<template>
  <div class="notification-center">
    <div class="container-header">
      <nav>
        <router-link to="/notice/666">
          <span
            class="all"
            @click="selectNav('all')"
            :class="{active: navName === 'all'}"
          >全部 5</span>
        </router-link>
        <router-link to="/notice/666/comments">
          <span
            class="comments"
            @click="selectNav('comments')"
            :class="{active: navName === 'comments'}"
          >评论 2</span>
        </router-link>
        <router-link to="/notice/666/answers">
          <span
            class="answers"
            @click="selectNav('answers')"
            :class="{active: navName === 'answers'}"
          >回复 1</span>
        </router-link>
        <router-link to="/notice/666/follows">
          <span
            class="follows"
            @click="selectNav('follows')"
            :class="{active: navName === 'follows'}"
          >关注 1</span>
        </router-link>
        <router-link to="/notice/666/likes">
          <span
            class="likes"
            @click="selectNav('likes')"
            :class="{active: navName === 'likes'}"
          >赞 2</span>
        </router-link>
      </nav>
    </div>

    <div class="container-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navName: "all"
    };
  },
  methods: {
    selectNav(str) {
      this.navName = str;
    }
  }
};
</script>

<style scoped>
.notification-center {
  max-width: 720px;
  margin: auto;
  border-radius: 5px;
}

.container-header{
  border-radius: 5px;
  background-color: #ffffff;
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

.all,
.comments,
.answers,
.follows,
.likes {
  font-size: 14px;
  padding: 10px 15px;
  background-color: #ffffff;
  border-bottom: 2px solid #ffffff;
  cursor: pointer;
}

.active {
  color: #4170ea;
  border-bottom: 2px solid #4170ea;
}

.container-content {
  margin: 10px 0;
  border-radius: 5px;
  background-color: #FFFFFF;
}
</style>
