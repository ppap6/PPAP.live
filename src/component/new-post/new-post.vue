<template>
  <div class="new-post">
    <h1>{{ msg }}</h1>
    <mavon-editor></mavon-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是发帖 markdown 组件"
    };
  }
};
</script>

<style scoped>
.new-post {
  max-width: 1150px;
  margin: auto;
  border-radius: 5px;
}

.new-post h1{
  padding: 20px;
}
</style>
