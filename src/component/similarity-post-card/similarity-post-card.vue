<template>
  <div class="similarity-post-card">
    <div class="title">
      <div class="content">
        <span>更多帖子</span>
      </div>
    </div>
    <div class="post-list">
      <div class="post" v-for="item in postList" :key="item.id">
        <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
        <img class="avatar" src="~common/img/avatar.gif" alt v-else>
        <router-link :to="`/post/${item.id}`">
          <p class="post-title" v-html="item.title"></p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendPostList } from 'api/post'

export default {
  props: ['words'],
  data() {
    return {
      postList: []
    }
  },
  computed: {
    title(){
      return this.words
    }
  },
  watch: {
    title(){
      this.getRecommendPostList()
    }
  },
  methods: {
    getRecommendPostList(){
      let data ={
        page_num: 1,
        page_size: 10,
        post_id: this.$route.params.id
      }
      getRecommendPostList(data).then(response => {
        if(response.data.status == 200){

          let list = response.data.message.list
          let posts = []
          for(let m=0; m<list.length; m++){
            if(list[m].id == this.$route.params.id){
              continue
            }
            posts.push(list[m])
          }

          let postList = []

          //搜索关键字数组
          let wordsArr = this.title.split('')
          
          for(let i=0; i<posts.length; i++){
            
            let titleTextArr = posts[i].title.split('')

            for(let j=0; j<titleTextArr.length; j++){
              for(let k=0; k<wordsArr.length; k++){
                if(wordsArr[k] == titleTextArr[j]){
                  titleTextArr[j] = `<span style="color:#bc3454">${wordsArr[k]}</span>`
                }
              }
            }

            posts[i].title = titleTextArr.join('')
          }
          this.postList = posts
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.similarity-post-card {
  background-color hsl(0, 0%, 100%)
  border-radius 5px

  .title {
    width 100%
    height 36px
    display flex
    flex-direction column
    justify-content center
    border-bottom 1px solid #ececec

    .content {
      display flex
      align-items center

      span {
        height 16px
        line-height 16px
        text-align left
        padding 0 5px 0 10px
        margin-left 10px
        font-size 14px
        border-left 3px solid #009688
        display inline-block
      }

      @media screen and (max-width: 850px) {
        span {
          margin-left 20px
        }
      }

      .hot-icon {
        height 22px
        width 22px
      }
    }
  }

  .post-list {
    padding 10px

    .post {
      font-size 14px
      text-align left
      display flex
      flex-direction row
      align-items center
      margin 10px auto

      .avatar {
        height 25px
        width 25px
        border-radius 50%

      }

      .post-title {
        font-size 12px
        color #171717
        margin-left 10px
      }
      .post-title:hover {
        text-decoration underline
      }
    }
  }

  @media screen and (max-width: 850px){
    .post-list {
      padding 10px 20px
    }
  }
}
</style>
