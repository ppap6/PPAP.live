<template>
  <div class="container">
    <div class="tag-list" id="left"></div>
    <div class="post-list" id="center"></div>
    <div id="right">
      <div class="profile-card"></div>
      <div class="hot-post-list"></div>
      <div class="links"></div>
    </div>
  </div>
</template>

<script>
export default {};
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
  background-color: #ffffff;
  border-radius: 5px;
}
</style>