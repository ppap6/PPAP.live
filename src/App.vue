<template>
  <div id="app">
    <p-header></p-header>
    <!-- <img src="./assets/img/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import PHeader from "./components/p-header/p-header.vue";

export default {
  name: "App",
  components: {
    PHeader
  }
};
</script>

<style>
@import "./assets/css/reset.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
