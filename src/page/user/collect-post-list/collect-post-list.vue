<template>
  <div class="user-collect-post-list">
    <div class="post" v-for="item in postList" :key="item.id">
      <div class="title">
        <router-link :to="`/post/${item.id}`">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonCollectList } from 'api/person'

export default {
  data () {
    return {
      msg: '我的收藏的帖子列表组件',
      postList: []
    }
  },
  created(){
    this.getPersonCollectList()
  },
  methods: {
    getPersonCollectList(){
      let uid = this.$route.params.id
      getPersonCollectList(uid).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message
        }else if(response.data.status === 10003){
          this.postList = []
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
.post{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: top;
  background-color: #FFFFFF;
  padding: 10px 20px 10px;
  border-radius: 5px;
  margin: 5px 0;

  .title{
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
