<template>
  <div class="user-follow-topic-list">
    <div class="topic" v-for="item in topicList" :key="item.id">
      <div class="name">
        <router-link :to="`/topic/${item.id}`" target="_blank">{{item.name}}</router-link>
      </div>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getPersonTopicList } from 'api/person'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'

export default {
  data () {
    return {
      msg: '我的关注的话题列表组件',
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      topicList: [],
      noData: false
    }
  },
  created(){
    this.getPersonTopicList()
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
      window.addEventListener('scroll', this.handleScroll)
    },
    removeListenScroll(){
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll(){
      let scrollDiff = util.getScrollHeight() - util.getClientHeight() - util.getScrollTop()
      if(scrollDiff < 50){
        this.loadMore()
      }
    },
    getPersonTopicList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
        user_id: this.$route.params.id
      }
      getPersonTopicList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          this.topicList = response.data.message.list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.topicList = []
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
      getPersonTopicList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.topicList.push(list[i])
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
.user-follow-topic-list {
  .topic{
    position relative
    display flex
    flex-direction row
    align-items top
    background-color #FFFFFF
    padding 10px 20px 10px
    border-radius 5px
    margin 5px 0

    .name{
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

  .nofound {
    height 200px
    width 200px
  }
}
</style>
