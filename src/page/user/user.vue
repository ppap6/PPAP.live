<template>
  <div class="user-center">
    <Loading :loading="loading"></Loading>
    <div class="container-header">
      <div class="user-bg" :style="`background-image: ${user.bg ? 'url('+user.bg+')' : 'none'};background-color: ${user.bg ? 'transparentify' : '#565a63'}`"></div>
      <header>
        <div class="header-left">
          <img class="avatar" :src="user.avatar" alt v-if="user.avatar != '' && user.avatar != null">
          <img class="avatar" src="~common/img/avatar.gif" alt v-else>
        </div>
        <div class="header-right">
          <p class="name">{{user.name}}</p>
          <p class="auth-title" v-if="user.utitle">
            <img src="~common/img/auth_title.png">
            <span>{{user.utitle}}</span>
          </p>
          <p class="auth-role" v-if="user.role_id != 5">
            <img src="~common/img/auth_role.png">
            <span>{{user.role_name}}</span>
          </p>
          <p class="join-date">加入于 {{user.create_time ? user.create_time.split(' ')[0] : ''}}</p>
          <p class="intro" v-if="user.signature">
            <img src="~common/img/intro.png">
            <span>{{user.signature}}</span>
          </p>
        </div>
        <span class="settings" @click="settings" v-if="uid == userId">设置</span>
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
import Loading from 'component/loading/loading'
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
      isFollow: false,
      loading: true
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
  components: {
    Loading
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
          //隐藏加载动画
          this.loading = false
        }else if(response.data.status == 10003){
          //隐藏加载动画
          this.loading = false
          swal({
            title: '走着走着，人没了'
          }).then(() => {
            this.$router.replace({
              path: '/'
            })
          })
        }else{
          //隐藏加载动画
          this.loading = false
          swal({
            title: response.data.message
          }).then(() => {
            this.$router.replace({
              path: '/'
            })
          })
        }
      })
    },
    settings(){
      this.$router.push({
        path: `/user/${this.userId}/settings`
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

    .user-bg {
      height 160px
      width 100%
      padding 0
      margin 0
      border-top-left-radius 5px
      border-top-right-radius 5px
      background-size cover
      background-position center center
      // background-color #565a63
      background-color transparentify
      background-repeat no-repeat
    }

    header {
      position relative
      display flex
      flex-direction column
      align-items center
      justify-content center
      padding 20px 20px 15px
      margin-top -70px

      .settings{
        position absolute
        top 80px
        right 30px
        cursor pointer
        color #717171
        font-size 14px
        background-color #ececec
        border-radius 15px
        padding 4px 12px
        transition all .1s linear

        &:hover {
          color #fff
          background-color #4170ea
          transform scale(1.1)
        }
      }

      .follow {
        position absolute
        top 80px
        right 30px
        cursor pointer
        color #717171
        font-size 14px
        background-color #ececec
        border-radius 15px
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
          border 3px solid #fff
        }
      }

      .header-right {
        display flex
        flex-direction column
        justify-content center
        align-items center
        padding 2px 15px

        .name {
          font-size 24px
          font-weight bold
        }

        .join-date {
          font-size 12px
          color #999999
        }

        .auth-role {
          display flex
          align-items center
          justify-content center
          font-size 14px
          color #515151
          margin 2px 0 10px
          padding 0 15px
          text-align center

          img {
            height 20px
            width 20px
          }

          span {
            margin 0 4px
            color #f2aa24
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          }
        }

        .auth-title {
          display flex
          align-items center
          font-size 14px
          color #515151
          margin 2px 0 0

          img {
            height 28px
            width 28px
            margin-bottom 8px
          }

          span {
            margin 0 4px
            color #f2aa24
          }
        }

        .intro {
          display flex
          align-items center
          font-size 14px
          color #515151
          margin 10px 0 0

          img {
            height 18px
            width 18px
          }

          span {
            margin 0 8px
          }
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
        transition all 0.2s linear
      }

      .active {
        color #4170ea
        border-bottom 2px solid #4170ea
      }
    }

    @media screen and (max-width: 500px) {
      nav {
        position relative
        height 50px
        width 100vw
        padding 0
        overflow-y hidden
        overflow-x auto
        display flex
        white-space nowrap

        a {
          display inline-block
          line-height 50px
        }
      }
    }
  }

  .container-content {
    margin 10px 0
    border-radius 5px
  }
}
</style>
