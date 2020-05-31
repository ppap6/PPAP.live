<template>
  <div class="all-list">
    <div v-for="item in activityList" :key="item._id">
      <!-- 评论消息 -->
      <div class="activity" v-if="item.type === 1" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
        <span class="text">留下了评论</span>
        <div class="right">
          <router-link :to="`/comment/${item.comment_id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 回复消息 -->
      <div class="activity" v-if="item.type === 2" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
        <span class="text" v-if="uid == item.targetor_id">回复了你</span>
        <span class="text" v-if="uid != item.targetor_id">
          <span>回复了&nbsp;</span>
          <router-link :to="`/user/${item.targetor_id}`">
            <p class="name">{{item.targetor_name}}</p>
          </router-link>
        </span>
        <div class="right">
          <router-link :to="`/answer/${item.answer_id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 关注消息 -->
      <div class="activity" v-if="item.type === 3" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text" v-if="uid == item.targetor_id">关注了你</span>
        <span class="text" v-if="uid != item.targetor_id">
          <span>关注了&nbsp;</span>
          <router-link :to="`/user/${item.targetor_id}`">
            <p class="name">{{item.targetor_name}}</p>
          </router-link>
        </span>
      </div>
      <!-- 点赞消息 -->
      <div class="activity" v-if="item.type === 4" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text" v-if="uid == item.targetor_id">点赞了你的文章</span>
        <span class="text" v-if="uid != item.targetor_id">
          <span>点赞了&nbsp;</span>
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span>&nbsp;的文章</span>
        </span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="activity" v-if="item.type === 5" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text" v-if="uid == item.targetor_id">收藏了你的文章</span>
        <span class="text" v-if="uid != item.targetor_id">
          <span>收藏了&nbsp;</span>
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span>&nbsp;的文章</span>
        </span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
      <!-- 关注话题 -->
      <div class="activity" v-if="item.type === 6" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">
          <span>关注了话题&nbsp;</span>
          <router-link :to="`/topic/${item.topic_id}`">
            <p class="name">{{item.topic_name}}</p>
          </router-link>
        </span>
      </div>
       <!-- 关注消息 -->
      <div class="activity" v-if="item.type === 7" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt v-if="item.avatar != '' && item.avatar != null">
            <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">发表了文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
    <LoadingBottom :state="hasMore"></LoadingBottom>
  </div>
</template>

<script>
import { getPersonFollowDynamicList } from 'api/person'
import { getStorage } from 'common/js/localstorage'
import LoadingBottom from 'component/loading-bottom/loading-bottom'
import util from 'common/js/util'
import swal from 'sweetalert'
import { formatTime } from 'common/js/timeformat'

export default {
  name: 'Follow',
  data () {
    return {
      msg: '我所关注用户的动态的组件',
      uid: getStorage('user').uid,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loadMoreState: false,
      hasMore: true,
      activityList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞，5为收藏，6为话题，7为发表
      ],
      noData: false
    }
  },
  watch: {
    $route(to, from){   
      if(from.path == '/follow'){
        this.removeListenScroll() 
      }
      if(to.path == '/follow'){
        this.listenScroll() 
        if(!getStorage('user')){
          swal({
            title: '请先登陆'
          }).then(() => {
            this.$router.push({
              path: '/login'
            })
          })
        }
      }
    }
  },
  created(){
    this.getPersonFollowDynamicList()
  },
  mounted(){
    this.listenScroll()
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
    getPersonFollowDynamicList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getPersonFollowDynamicList(data).then(response => {
        if(response.data.status == 200){
          this.total = response.data.message.total
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            list[i].create_time = formatTime(list[i].create_time)
          }
          this.activityList = list
          //隐藏加载动画
          if(this.total < this.pageSize){
            this.hasMore = false
          }
        }else if(response.data.status == 10003){
          this.activityList = []
          this.noData = true
          //隐藏加载动画
          this.hasMore = false
        }else{
          //不作处理
          //隐藏加载动画
          this.hasMore = false
        }
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
      getPersonFollowDynamicList(data).then(response => {
        if(response.data.status === 200){
          let list = response.data.message.list
          for(let i=0; i<list.length; i++){
            this.activityList.push(list[i])
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
.all-list{
  max-width 720px
  margin auto
  border-radius 5px

  .activity{
    position relative
    display flex
    flex-direction row
    align-items center
    background-color #FFFFFF
    padding 10px 20px
    border-radius 5px
    margin 5px 0

    .left {
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

    .datetime{
      font-size 14px
      margin-left 5px
      color #999999
    }

    .text{
      font-size 14px
      margin 0 5px
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

    .right{
      a {
        .title {
          height 18px
          line-height 18px
          font-size 14px
          color #1c1e25 !important

          &:hover {
            text-decoration underline
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
