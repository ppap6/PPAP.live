<template>
  <div class="user-fans-list">
    <div class="follower" v-for="item in fansList" :key="item.id">
      <div class="left">
        <router-link :to="`/user/${item.id}`" target="_blank">
          <img class="avatar" :src="item.avatar" alt>
        </router-link>
      </div>
      <div class="right">
        <router-link :to="`/user/${item.id}`" target="_blank">
          <p class="name">{{item.name}}</p>
        </router-link>
        <div class="count">
          <span class="fans">粉丝 {{item.fans}}</span>
          <span class="follows">关注 {{item.follows}}</span>
        </div>
      </div>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getPersonFansList } from 'api/person'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'

export default {
  data () {
    return {
      msg: '我的粉丝列表组件',
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      fansList: [],
      noData: false
    }
  },
  created(){
    this.getPersonFansList()
  },
  mounted(){
    this.listenScroll()
  },
  destroyed(){
    this.removeListenScroll()
  },
  components: {
    LoadingBottom
  },
  methods: {
    listenScroll(){
      window.addEventListener("scroll", this.handleScroll)
    },
    removeListenScroll(){
      window.removeEventListener("scroll", this.handleScroll)
    },
    handleScroll(){
      let scrollDiff = util.getScrollHeight() - util.getClientHeight() - util.getScrollTop()
      if(scrollDiff < 50){
        this.loadMore()
      }
    },
    getPersonFansList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        user_id: this.$route.params.id,
      }
      getPersonFansList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.fansList = response.data.message.list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.fansList = []
          this.noData = true
          this.hasMore = false
        }else{
          //不作处理
          this.hasMore = false
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    loadMore(){
      //判断当前是否正在加载，避免多次加载
      if(this.loadMoreState){
        return
      }
      //进入加载模式
      this.loadMoreState = true
      this.pageNum ++
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        user_id: this.$route.params.id
      }
      getPersonFansList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.fansList.push(list[i])
          }
          this.loadMoreState = false
        }else if(response.data.status === 10003){
          this.hasMore = false
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
.user-fans-list {
  .follower{
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
          color #009688 !important

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
        color #616161

        span{
          margin-right 10px
        }
      }
    }
  }

  .nofound {
    height 200px
    width 200px
  }
}
</style>
