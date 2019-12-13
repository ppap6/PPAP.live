<!--
 * @Author: jwchan1996
 * @Date: 2019-11-05 10:41:42
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-12-13 15:18:19
 -->
<template>
  <div class="container">
    <div class="post-list">
      <PostList :postList="postList"></PostList>
    </div>
  </div>
</template>

<script>
import PostList from 'component/post-list/post-list'
import { getSearchPostList } from 'api/search'

export default {
  data() {
    return {
      msg: '搜索帖子列表组件',
      postList: []
    }
  },
  components: {
    PostList
  },
  watch: {
    $route(to, from){
      this.getSearchPostList()
    }
  },
  created(){
    this.getSearchPostList()
  },
  methods: {
    getSearchPostList(){
      let keyword = this.$route.query.keyword
      getSearchPostList(keyword).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message
        }else if(response.data.status === 10003){
          this.postList = []
        }else{
          console.log('服务器开小差了，请稍后重试！')
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.container {
  border-radius 5px
  margin 5px 0
}
</style>
