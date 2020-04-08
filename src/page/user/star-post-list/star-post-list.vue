<!--
 * @Author: jwchan1996
 * @Date: 2019-06-12 14:07:33
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2019-12-19 11:33:22
 -->
<template>
  <div class="user-star-post-list">
    <div class="post" v-for="item in postList" :key="item.id">
      <div class="title">
        <router-link :to="`/post/${item.id}`" target="_blank">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonLikeList } from 'api/person'

export default {
  data () {
    return {
      msg: '我点赞的帖子列表组件',
      postList: []
    }
  },
  created(){
    this.getPersonLikeList()
  },
  methods: {
    getPersonLikeList(){
      let uid = this.$route.params.id
      getPersonLikeList(uid).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message.list
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
  position relative
  display flex
  flex-direction row
  align-items top
  background-color #FFFFFF
  padding 10px 20px 10px
  border-radius 5px
  margin 5px 0

  .title{
    &:hover{
      text-decoration underline
    }

    a{
      font-size 14px
      color #414141
      cursor pointer
      font-weight bold
    }
  }
}
</style>
