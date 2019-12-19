<template>
  <div id="app">
    <p-header></p-header>
    <keep-alive :include="['Home', 'TopicDetail', 'PostDetail', 'Follow', 'Notice']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import PHeader from "component/p-header/p-header.vue";

export default {
  name: "App",
  components: {
    PHeader
  }
};
</script>

<style>
@import './common/stylus/reset.styl';

body{
  background-color: #EAEDF0;
}

#app {
  font-family: "微软雅黑" ,"Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.swal-footer {
  text-align: center !important;
  margin-bottom: 20px !important;
}
.swal-button {
  color: #616161 !important;
  background-color: #ffd100 !important;
  transition: all 0.1s linear;
}
.swal-button:hover {
  border: none !important;
  transform: scale(1.1)
}
.swal-button:active {
  border: none !important;
  transform: scale(1.1)
}
</style>
