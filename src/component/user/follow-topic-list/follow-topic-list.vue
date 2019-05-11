<template>
  <div class="user-follow-topic-list">
    <h1>{{ msg }}</h1>
    <div class="topic" v-for="item in topicList" :key="item.id">
      <div class="name">
        <router-link to="/topic/话题id">{{item.name}}</router-link>
      </div>
      <div class="follow-btn">关注</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我的关注的话题列表组件',
      topicList: [
        {
          id: 8,
          name: 'Flutter'
        },
        {
          id: 9,
          name: 'Vue'
        },
        {
          id: 10,
          name: 'React'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.topic{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: top;
  background-color: #FFFFFF;
  padding: 10px 20px 10px;
  border-radius: 5px;
  margin: 5px 0;

  .name{
    &:hover{
      text-decoration: underline;
    }

    a{
      font-size: 14px;
      color: #515151;
      cursor: pointer;
    }
  }
  
  .follow-btn{
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
