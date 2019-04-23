<template>
  <div class="container">
    <div class="topic-list" id="left"></div>
    <div class="post-list" id="center"></div>
    <div id="right">
      <div class="profile-card">
        <ProfileCard></ProfileCard>
      </div>
      <div class="hot-post-card">
        <HotPostCard></HotPostCard>
      </div>
      <div class="links"></div>
    </div>
  </div>
</template>

<script>

import ProfileCard from "@/components/profile-card/profile-card"
import HotPostCard from "@/components/hot-post-card/hot-post-card"

export default {
  components: {
    ProfileCard,
    HotPostCard
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
  background-color: #ffffff;
  border-radius: 5px;
}

#center {
  position: relative;
  margin-left: 260px;
  margin-right: 260px;
  height: 800px;
  background-color: #ffffff;
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
.hot-post-card{
  margin-bottom: 10px;
}
</style>