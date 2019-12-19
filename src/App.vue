<template>
  <div id="app">
    <p-header></p-header>
    <keep-alive :include="['Home', 'TopicDetail', 'PostDetail']">
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
</style>
