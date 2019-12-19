<template>
  <div class="user-center">
    <div class="container-header">
      <header>
        <div class="header-left">
          <img class="avatar" :src="user.avatar" alt>
        </div>
        <div class="header-right">
          <p class="name">{{user.name}}</p>
          <p class="join-date">加入于 {{user.create_time ? user.create_time.split(' ')[0] : ''}}</p>
        </div>
        <span class="logout" @click="logout" v-if="uid == userId">退出</span>
        <span class="follow" @click="followUser" v-if="uid != userId && noFollow && user != ''">关注</span>
        <span class="follow" @click="cancelFollowUser" v-if="uid != userId && isFollow && user != ''">已关注</span>
      </header>
      <nav>
        <router-link :to="`/user/${userId}`">
          <span
            class="posts"
            @click="selectNav('posts')"
            :class="{active: navName === 'posts'}"
          >帖子 {{user.count ? user.count.posts : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/comments`">
          <span
            class="comments"
            @click="selectNav('comments')"
            :class="{active: navName === 'comments'}"
          >评论 {{user.count ? user.count.comments : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/answers`">
          <span
            class="answers"
            @click="selectNav('answers')"
            :class="{active: navName === 'answers'}"
          >回复 {{user.count ? user.count.answers : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/followers`">
          <span
            class="followers"
            @click="selectNav('followers')"
            :class="{active: navName === 'followers'}"
          >粉丝 {{user.count ? user.count.fans : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/follow-peoples`">
          <span
            class="follow-peoples"
            @click="selectNav('follow-peoples')"
            :class="{active: navName === 'follow-peoples'}"
          >关注 {{user.count ? user.count.follows : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/star-posts`">
          <span
            class="star-posts"
            @click="selectNav('star-posts')"
            :class="{active: navName === 'star-posts'}"
          >Stars {{user.count ? user.count.likes : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/collect-posts`" v-if="uid == userId">
          <span
            class="collect-posts"
            @click="selectNav('collect-posts')"
            :class="{active: navName === 'collect-posts'}"
          >收藏 {{user.count ? user.count.collects : ''}}</span>
        </router-link>
        <router-link :to="`/user/${userId}/follow-topics`">
          <span
            class="follow-topics"
            @click="selectNav('follow-topics')"
            :class="{active: navName === 'follow-topics'}"
          >话题 {{user.count ? user.count.topics : ''}}</span>
        </router-link>
      </nav>
    </div>

    <div class="container-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getUser, followUser, cancelFollowUser, getUserFollowStatus } from 'api/user'
import { getStorage, removeStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  data() {
    return {
      navName: "posts",
      userId: this.$route.params.id,
      uid: getStorage('user').uid,
      user: '',
      noFollow: true,
      isFollow: false
    }
  },
  watch: {
    $route(to, from){
      //监听路由变化，改变选中
      this.refleshSelectStatus(to.name)
      //更新当前用户ID，显示收藏列表
      this.userId = this.$route.params.id
      //反组件复用更新数据
      this.getUser()
    }
  },
  created(){
    this.getUser()
  },
  mounted(){
    this.refleshSelectStatus(this.$route.name) 
  },
  methods: {
    selectNav(str) {
      this.navName = str
    },
    refleshSelectStatus(route){
      switch (route) {
        case 'UserPostList':
          this.navName = 'posts'
          break
        case 'UserCommentList':
          this.navName = 'comments'
          break
        case 'UserAnswerList':
          this.navName = 'answers'
          break
        case 'UserFollowerList':
          this.navName = 'followers'
          break
        case 'UserFollowPeopleList':
          this.navName = 'follow-peoples'
          break
        case 'UserStarPostList':
          this.navName = 'star-posts'
          break
        case 'UserCollectPostList':
          this.navName = 'collect-posts'
          break
        case 'UserFollowTopicList':
          this.navName = 'follow-topics'
          break
      
        default:
          break
      }
    },
    getUser(){
      let id = this.$route.params.id
      getUser(id).then(response => {
        if(response.data.status == 200){
          this.user = response.data.message
          this.getUserFollowStatus()
        }else if(response.data.status == 10003){
          swal({
            title: '走着走着，人没了'
          }).then(() => {
            this.$router.go(-1)
          })
        }else{
          swal({
            title: response.data.message
          }).then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    logout(){
      swal({
        title: '确定退出登录吗',
        buttons: {
          cancel: '取消',
          confirm: '确定'
        }
      }).then(result => {
        if(result){
          removeStorage('user')
          this.$store.commit('resetToken', undefined)
          this.$router.push({
            path: '/'
          })
        }else{
          //取消退出
        }
      })
    },
    getUserFollowStatus(){
      if(this.uid == this.userId) return
      let id = this.$route.params.id
      getUserFollowStatus(id).then(response => {
        if(response.data.status == 200){
          this.isFollow = response.data.message.isFollow
          this.noFollow = !response.data.message.isFollow
        }
      })
    },
    followUser(){
      let data = {
        follow_uid: this.$route.params.id
      }
      followUser(data).then(response => {
        if(response.data.status === 200){
          this.isFollow = true
          this.noFollow = false
        }else if(response.data.status === 10000){
          this.isFollow = true
          this.noFollow = false
          swal({
            title: '已关注用户'
          })
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    },
    cancelFollowUser(){
      let data = {
        follow_uid: this.$route.params.id
      }
      cancelFollowUser(data).then(response => {
        if(response.data.status === 200){
          this.isFollow = false
          this.noFollow = true
        }else if(response.data.status === 10000){
          this.isFollow = false
          this.noFollow = true
          swal({
            title: '已取消关注用户'
          })
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
.user-center {
  max-width 720px
  margin auto
  border-radius 5px

  .container-header{
    border-radius 5px
    background-color #ffffff

    header {
      position relative
      display flex
      flex-direction row
      align-items top
      padding 20px

      .logout {
        position absolute
        top 20px
        right 30px
        cursor pointer
        color #717171
        font-size 12px
        background-color #ececec
        border-radius 12px
        padding 4px 12px
        transition all .1s linear

        &:hover {
          color #fff
          background-color #F54545
          transform scale(1.1)
        }
      }

      .follow {
        position absolute
        top 20px
        right 30px
        cursor pointer
        color #717171
        font-size 12px
        background-color #ececec
        border-radius 12px
        padding 4px 12px
        transition all .1s linear

        &:hover {
          color #fff
          background-color #4170ea
          transform scale(1.1)
        }
      }

      .header-left {
        .avatar {
          height 100px
          width 100px
          margin 0 10px
          border-radius 50%
        }
      }

      .header-right {
        padding 2px 15px

        .name {
          text-align left
          font-size 24px
          font-weight bold
        }

        .join-date {
          text-align left
          font-size 12px
          color #999999
        }
      }
    }

    nav {
      color #515151
      text-align left
      padding 10px 20px

      .posts,
      .comments,
      .answers,
      .followers,
      .follow-peoples,
      .star-posts,
      .collect-posts,
      .follow-topics {
        font-size 14px
        padding 10px 15px
        background-color #ffffff
        border-bottom 2px solid #ffffff
        cursor pointer
      }

      .active {
        color #4170ea
        border-bottom 2px solid #4170ea
      }
    }
  }

  .container-content {
    margin 10px 0
    border-radius 5px
  }
}
</style>
