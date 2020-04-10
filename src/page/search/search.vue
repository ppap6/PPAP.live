<template>
  <div class="search-center">
    <div class="container-header">
      <nav>
        <router-link :to="`/search/posts?keyword=${keyword}&s=${type}`">
          <span
            class="posts"
            @click="selectNav('posts')"
            :class="{active: navName === 'posts'}"
          >帖子</span>
        </router-link>
        <router-link :to="`/search/users?keyword=${keyword}&s=${type}`">
          <span
            class="users"
            @click="selectNav('users')"
            :class="{active: navName === 'users'}"
          >用户</span>
        </router-link>
        <div class="select-box">
          <select class="select" @change="changeType($event)">
            <option value="1" :selected="type == 1 ? true : false">模糊搜索</option>
            <option value="2" :selected="type == 2 ? true : false">分词搜索</option>
            <option value="3" :selected="type == 3 ? true : false">精准搜索</option>
          </select>
        </div>
        
      </nav>
    </div>

    <div class="container-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navName: 'posts',
      keyword: '',
      type: 1
    }
  },
  watch: {
    $route(to, from){
      //监听路由变化，改变选中
      this.refleshSelectStatus(to.name)
      //存储query
      this.keyword = this.$route.query.keyword
      this.type = this.$route.query.s
    }
  },
  created(){
    this.keyword = this.$route.query.keyword
    this.type = this.$route.query.s
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
        case 'SearchPostList':
          this.navName = 'posts'
          break
        case 'SearchUserList':
          this.navName = 'users'
          break
      
        default:
          break
      }
    },
    changeType(e){
      this.type = e.target.value
      this.$router.replace({
        query: {
          keyword: this.keyword,
          s: e.target.value
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.search-center {
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
      position relative
      color #515151
      text-align left
      padding 10px 20px

      .posts,
      .users {
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

      .select-box {
        position absolute
        top 10px
        right 20px

        .select {
          width 100px
          color #999
          border-radius 3px
          box-shadow 0 0 3px #999
          cursor pointer !important
          outline none !important
          padding 1px 5px 4px
          font-size 14px
          line-height 18px
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
