<template>
  <div class="all-list">
    <template v-for="item in noticeList">
      <!-- 评论消息 -->
      <div class="notice" v-if="item.type === 1 && uid != item.uid" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
          </router-link>
        </div>
        <div class="right">
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span class="text">在文章</span>
          <div class="link">
            <router-link :to="`/post/${item.pid}`">
              <p class="title">{{item.pname}}</p>
            </router-link>
          </div>
          <span class="text">留下了评论</span>
          <div class="link">
            <router-link :to="`/comment/${item.comment_id}`">
              <p class="title">查看详情</p>
            </router-link>
          </div>
          <span class="datetime">{{item.create_time}}</span>
        </div>
      </div>
      <!-- 回复消息 -->
      <div class="notice" v-if="item.type === 2 && uid != item.uid" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
          </router-link>
        </div>
        <div class="right">
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span class="text">在文章</span>
          <div class="link">
            <router-link :to="`/post/${item.pid}`">
              <p class="title">{{item.pname}}</p>
            </router-link>
          </div>
          <span class="text">回复了你</span>
          <div class="link">
            <router-link :to="`/answer/${item.answer_id}`">
              <p class="title">查看详情</p>
            </router-link>
          </div>
          <span class="datetime">{{item.create_time}}</span>
        </div>
      </div>
      <!-- 关注消息 -->
      <div class="notice" v-if="item.type === 3 && uid != item.uid" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
          </router-link>
        </div>
        <div class="right">
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span class="text">关注了你&nbsp;</span>
          <span class="datetime">{{item.create_time}}</span>
        </div>
      </div>
      <!-- 点赞消息 -->
      <div class="notice" v-if="item.type === 4 && uid != item.uid" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
          </router-link>
        </div>
        <div class="right">
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span class="text">点赞了你的文章</span>
          <div class="link">
            <router-link :to="`/post/${item.pid}`">
              <p class="title">{{item.pname}}</p>
            </router-link>
          </div>
          <span class="datetime">{{item.create_time}}</span>
        </div>
      </div>
      <!-- 收藏消息 -->
      <div class="notice" v-if="item.type === 5 && uid != item.uid" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
          </router-link>
        </div>
        <div class="right">
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span class="text">收藏了你的文章</span>
          <div class="link">
            <router-link :to="`/post/${item.pid}`">
              <p class="title">{{item.pname}}</p>
            </router-link>
          </div>
          <span class="datetime">{{item.create_time}}</span>
        </div>
      </div>
    </template>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getNoticeList } from 'api/notice'
import { getStorage } from 'common/js/localstorage'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'
import { formatTime } from 'common/js/timeformat'

export default {
  data () {
    return {
      msg: '全部通知的组件',
      uid: getStorage('user').uid,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      noticeList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞，5为收藏
      ],
      noData: false
    }
  },
  created(){
    this.getNoticeList()
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
    getNoticeList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize,
      }
      getNoticeList(data).then(response => {
        if(response.data.status === 200){
          this.total = response.data.message.total
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            list[i].create_time = formatTime(list[i].create_time)
          }
          this.noticeList = list
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status === 10003){
          this.noticeList = []
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
        page_size: this.pageSize
      }
      getNoticeList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.noticeList.push(list[i])
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
.all-list {
  .notice{
    position relative 
    display flex 
    flex-direction row 
    align-items center 
    background-color #FFFFFF 
    padding 10px 20px 
    border-radius 5px 
    margin 5px 0 

    .left {
      flex-shrink 0

      a{
        display flex
        flex-direction row
        align-items center

        .avatar {
          height 28px
          width 28px
          border-radius 50%
          margin-right 10px
        }
      }
    } 

    .right {
      display flex
      flex-direction row
      align-items center
      flex-wrap wrap

      a{
        display flex
        flex-direction row
        align-items center

        .name{
          color #333333
          font-size 14px
          margin 0 5px 0 0

          &:hover{
            text-decoration underline
          }
        }
      }
      
      .datetime{
        font-size 13px
        color #999999
      }

      .text{
        font-size 14px
        color #999999
        display flex
        flex-direction row
        align-items center

        a{
          display flex
          flex-direction row
          align-items center

          .avatar {
            height 24px
            width 24px
            border-radius 50%
            margin-right 6px
          }

          .name{
            color #333333
            font-size 14px

            &:hover{
              text-decoration underline
            }
          }
        }
      }

      .link{
        a {
          .title {
            height 18px
            line-height 18px
            font-size 14px
            color #1c1e25 !important
            margin 0 5px

            &:hover {
              text-decoration underline
            }
          }
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
