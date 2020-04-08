<template>
  <div class="container">
    <div class="user-list" v-for="item in userList" :key="item.id">
      <div class="left">
        <router-link :to="`/user/${item.id}`">
          <img class="avatar" :src="item.avatar" alt>
        </router-link>
      </div>
      <div class="right">
        <router-link :to="`/user/${item.id}`">
          <p class="name" v-html="item.name"></p>
        </router-link>
        <div class="count">
          <span class="followers">粉丝 {{item.fans_count}}</span>
          <span class="follows">关注 {{item.follow_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchUserList } from 'api/search'

export default {
  data () {
    return {
      msg: '搜索用户列表组件',
      userList: []
    }
  },
  watch: {
    $route(to, from){
      this.getSearchUserList()
    }
  },
  created(){
    this.getSearchUserList()
  },
  methods: {
    getSearchUserList(){
      let words = this.$route.query.keyword
      getSearchUserList(words).then(response => {
        if(response.data.status === 200){

          let users = response.data.message.list
          let userList = []

          //搜索关键字数组
          let wordsArr = words.split('')
          
          for(let i=0; i<users.length; i++){
            
            let nameTextArr = users[i].name.split('')

            for(let j=0; j<nameTextArr.length; j++){
              for(let k=0; k<wordsArr.length; k++){
                if(wordsArr[k] == nameTextArr[j]){
                  nameTextArr[j] = `<span style="color:#f54545">${wordsArr[k]}</span>`
                }
              }
            }

            users[i].name = nameTextArr.join('')
          }
          this.userList = users

        }else if(response.data.status === 10003){
          this.userList = []
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
.user-list{
  position relative
  display flex
  flex-direction row
  align-items top
  background-color #FFFFFF
  padding 10px 20px 5px
  border-radius 5px
  margin 5px 0

  .left {
    .avatar {
      height 44px
      width 44px
      border-radius 50%
    }
  } 

  .right{
    text-align left
    padding 2px 15px

    a {
      .name {
        height 18px
        line-height 18px
        font-size 14px
        font-weight bold
        color #1c1e25 !important

        &:hover {
          text-decoration underline
        }
      }
    }

    .count {
      height 18px
      line-height 24px
      font-size 12px
      font-weight bold

      span{
        margin-right 10px
      }
    }
  }
}
</style>
