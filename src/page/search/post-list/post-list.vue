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
      let words = this.$route.query.keyword
      getSearchPostList(words).then(response => {
        if(response.data.status === 200){

          let posts = response.data.message.list
          let postList = []

          //搜索关键字数组
          let wordsArr = words.split('')
          
          for(let i=0; i<posts.length; i++){
            
            let titleTextArr = posts[i].title.split('')

            for(let j=0; j<titleTextArr.length; j++){
              for(let k=0; k<wordsArr.length; k++){
                if(wordsArr[k] == titleTextArr[j]){
                  titleTextArr[j] = `<span style="color:#f54545">${wordsArr[k]}</span>`
                }
              }
            }

            posts[i].title = titleTextArr.join('')
          }
          this.postList = posts

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
