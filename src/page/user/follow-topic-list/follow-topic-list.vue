<template>
  <div class="user-follow-topic-list">
    <div class="topic" v-for="item in topicList" :key="item.id">
      <div class="name">
        <router-link :to="`/topic/${item.id}`">{{item.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonTopicList } from 'api/person'

export default {
  data () {
    return {
      msg: '我的关注的话题列表组件',
      topicList: []
    }
  },
  created(){
    this.getPersonTopicList()
  },
  methods: {
    getPersonTopicList(){
      let uid = this.$route.params.id
      getPersonTopicList(uid).then(response => {
        if(response.data.status === 200){
          this.topicList = response.data.message
        }else if(response.data.status === 10003){
          this.topicList = []
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
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
      color: #717171;
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
