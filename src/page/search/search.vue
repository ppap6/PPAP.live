<template>
  <div class="search-center">
    <div class="container-header">
      <nav>
        <router-link :to="`/search/posts?keyword=${keyword}`">
          <span
            class="posts"
            @click="selectNav('posts')"
            :class="{active: navName === 'posts'}"
          >帖子</span>
        </router-link>
        <router-link :to="`/search/users?keyword=${keyword}`">
          <span
            class="users"
            @click="selectNav('users')"
            :class="{active: navName === 'users'}"
          >用户</span>
        </router-link>
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
      keyword: ''
    };
  },
  watch: {
    $route(to, from){
      //监听路由变化，改变选中
      this.refleshSelectStatus(to.name)
      //存储query
      this.keyword = this.$route.query.keyword
    }
  },
  created(){
    this.keyword = this.$route.query.keyword
  },
  mounted(){
    this.refleshSelectStatus(this.$route.name) 
  },
  methods: {
    selectNav(str) {
      this.navName = str;
    },
    refleshSelectStatus(route){
      switch (route) {
        case 'SearchPostList':
          this.navName = 'posts'
          break;
        case 'SearchUserList':
          this.navName = 'users'
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.search-center {
  max-width: 720px;
  margin: auto;
  border-radius: 5px;

  .container-header{
    border-radius: 5px;
    background-color: #ffffff;

    header {
      display: flex;
      flex-direction: row;
      align-items: top;
      padding: 20px;

      .header-left{
        .avatar {
          height: 100px;
          width: 100px;
          margin: 0 10px;
          border-radius: 50%;
        }
      }

      .header-right {
        padding: 2px 15px;

        .name {
          text-align: left;
          font-size: 24px;
          font-weight: bold;
        }

        .join-date {
          text-align: left;
          font-size: 12px;
          color: #999999;
        }
      }
    }

    nav {
      color: #515151;
      text-align: left;
      padding: 10px 20px;

      .posts,
      .users {
        font-size: 14px;
        padding: 10px 15px;
        background-color: #ffffff;
        border-bottom: 2px solid #ffffff;
        cursor: pointer;
      }

      .active {
        color: #4170ea;
        border-bottom: 2px solid #4170ea;
      }
    }
  }

  .container-content {
    margin: 10px 0;
    border-radius: 5px;
  }
}
</style>
