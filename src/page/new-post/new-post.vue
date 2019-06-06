<template>
  <div class="new-post">
    <h1>{{ msg }}</h1>
    <mavon-editor
      @change="change">
    </mavon-editor>
    <div class="submit" @click="submit">发表</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是发帖 markdown 组件",
      renderData: ''
    };
  },
  methods: {
    change(value, render){
      console.log(value)
      console.log(render)
      this.renderData = render
    },
    submit(){
      if(confirm("确定要发表该文章吗？")){
        console.log(this.renderData)
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.new-post {
  max-width: 1150px;
  margin: auto;
  border-radius: 5px;

  h1{
    padding: 20px;
  }

  .submit{
    display: inline-block;
    color: #009688;
    padding: 8px 40px;
    border: 1px solid #009688;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;

    &:hover{
      color: #fff;
      background-color: #009688;
    }
  }
}
</style>
