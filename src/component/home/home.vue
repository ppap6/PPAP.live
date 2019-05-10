<template>
  <div class="container">
    <div class="topic-list" id="left">
      <TopicList></TopicList>
    </div>
    <div class="post-list" id="center">
      <PostList></PostList>
    </div>
    <div id="right">
      <div class="profile-card">
        <ProfileCard></ProfileCard>
      </div>
      <div class="hot-post-card">
        <HotPostCard></HotPostCard>
      </div>
      <div class="link-card">
        <LinkCard></LinkCard>
      </div>
    </div>
  </div>
</template>

<script>
import TopicList from "component/topic-list/topic-list"
import PostList from "component/post-list/post-list"
import ProfileCard from "component/profile-card/profile-card"
import HotPostCard from "component/hot-post-card/hot-post-card"
import LinkCard from "component/link-card/link-card"

export default {
  components: {
    ProfileCard,
    HotPostCard,
    LinkCard,
    TopicList,
    PostList
  }
}
</script>

<style scoped>
.container {
  position: relative;
  max-width: 1180px;
  margin: auto;
}

#left {
  position: fixed;
  width: 250px;
  height: 500px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

#center {
  position: relative;
  margin-left: 260px;
  margin-right: 260px;
  height: 800px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

#right {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 600px;
  /* background-color: #ffffff; */
  border-radius: 5px;
}

.profile-card,
.hot-post-card {
  margin-bottom: 10px;
}
</style>