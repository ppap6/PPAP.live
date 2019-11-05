<template>
  <div class="new-post">
    <h1>{{ msg }}</h1>
    <TopicList></TopicList>
    <div class="post-header">
      <div class="title-container">
        <span class="text">标题</span>
        <input type="text" class="title" placeholder="请输入标题……">
      </div>
      <div class="submit" @click="submit">发布</div>
    </div>
    <mavon-editor
      @change="change">
    </mavon-editor>
  </div>
</template>

<script>
import TopicList from "component/topic-list/topic-list"
export default {
  data() {
    return {
      msg: "我是发帖 markdown 组件",
      renderData: ''
    };
  },
  components: {
    TopicList
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

  .post-header{
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #fff;
    width: 100%;
    margin: 10px 0;
    border-radius: 5px;

    .title-container{
      width: 100%;
      display: flex;
      align-items: center;

      .text{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 80px;
        border-right: 1px solid #ececec;
        background-color: #fff;
      }

      .title{
        height: 20px;
        width: 100%;
        padding: 10px 20px;
        background-color: #fefefe;
      }
    }

    .submit{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      height: 20px;
      width: 40px;
      color: #fff;
      background-color: #4170ea;
      padding: 10px 30px;
      cursor: pointer;

      &:hover{
        color: #fff;
        background-color: #009688;
      }
    }
  }
}
</style>
