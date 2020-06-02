<template>
  <div class="notification-center">
    <div class="container-header">
      <nav>
        <router-link to="/notice">
          <span
            class="all"
            @click="selectNav('all')"
            :class="{active: navName === 'all'}"
          >全部</span>
        </router-link>
        <router-link to="/notice/comments">
          <span
            class="comments"
            @click="selectNav('comments')"
            :class="{active: navName === 'comments'}"
          >评论</span>
        </router-link>
        <router-link to="/notice/answers">
          <span
            class="answers"
            @click="selectNav('answers')"
            :class="{active: navName === 'answers'}"
          >回复</span>
        </router-link>
        <router-link to="/notice/followers">
          <span
            class="followers"
            @click="selectNav('followers')"
            :class="{active: navName === 'followers'}"
          >关注</span>
        </router-link>
        <router-link to="/notice/likes">
          <span
            class="likes"
            @click="selectNav('likes')"
            :class="{active: navName === 'likes'}"
          >赞</span>
        </router-link>
        <router-link to="/notice/collects">
          <span
            class="collects"
            @click="selectNav('collects')"
            :class="{active: navName === 'collects'}"
          >收藏</span>
        </router-link>
      </nav>
    </div>

    <div class="container-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  name: 'Notice',
  data() {
    return {
      navName: 'all'
    }
  },
  watch: {
    $route(to, from){
      //监听路由变化，改变选中
      this.refleshSelectStatus(to.name)
      if(to.path == '/notice'){
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
  mounted(){
    this.refleshSelectStatus(this.$route.name) 
  },
  methods: {
    selectNav(str) {
      this.navName = str
    },
    refleshSelectStatus(route){
      switch (route) {
        case 'NoticeAll':
          this.navName = 'all'
          break
        case 'Comments':
          this.navName = 'comments'
          break
        case 'Answers':
          this.navName = 'answers'
          break
        case 'Followers':
          this.navName = 'followers'
          break
        case 'Likes':
          this.navName = 'likes'
          break
        case 'Collects':
          this.navName = 'collects'
          break
      
        default:
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.notification-center {
  max-width 720px
  margin auto
  border-radius 5px

  .container-header{
    border-radius 5px
    background-color #ffffff

    header {
      display flex
      flex-direction row
      align-items top
      padding 20px

      .header-left{
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

      .all,
      .comments,
      .answers,
      .followers,
      .likes,
      .collects,
      .lights {
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
