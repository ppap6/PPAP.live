<!--
 * @Author: jwchan1996
 * @Date: 2019-05-19 22:24:35
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-16 23:38:29
 -->
<template>
  <div class="user-center">
    <div class="container-header">
      <header>
        <div class="header-left">
          <img class="avatar" src="https://jwchan.cn/images/avatar.jpg" alt>
        </div>
        <div class="header-right">
          <p class="name">Jwchan</p>
          <p class="join-date">加入于 10 天前</p>
        </div>
      </header>
      <nav>
        <router-link to="/user/666">
          <span
            class="posts"
            @click="selectNav('posts')"
            :class="{active: navName === 'posts'}"
          >帖子 1</span>
        </router-link>
        <router-link to="/user/666/comments">
          <span
            class="comments"
            @click="selectNav('comments')"
            :class="{active: navName === 'comments'}"
          >评论 2</span>
        </router-link>
        <router-link to="/user/666/answers">
          <span
            class="answers"
            @click="selectNav('answers')"
            :class="{active: navName === 'answers'}"
          >回复 4</span>
        </router-link>
        <router-link to="/user/666/followers">
          <span
            class="followers"
            @click="selectNav('followers')"
            :class="{active: navName === 'followers'}"
          >粉丝 2</span>
        </router-link>
        <router-link to="/user/666/follow-peoples">
          <span
            class="follow-peoples"
            @click="selectNav('follow-peoples')"
            :class="{active: navName === 'follow-peoples'}"
          >关注 1</span>
        </router-link>
        <router-link to="/user/666/star-posts">
          <span
            class="star-posts"
            @click="selectNav('star-posts')"
            :class="{active: navName === 'star-posts'}"
          >Stars 2</span>
        </router-link>
        <router-link to="/user/666/collect-posts">
          <span
            class="collect-posts"
            @click="selectNav('collect-posts')"
            :class="{active: navName === 'collect-posts'}"
          >收藏 1</span>
        </router-link>
        <router-link to="/user/666/follow-topics">
          <span
            class="follow-topics"
            @click="selectNav('follow-topics')"
            :class="{active: navName === 'follow-topics'}"
          >话题 2</span>
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
      navName: "posts"
    };
  },
  watch: {
    $route(to, from){
      //监听路由变化，改变选中
      this.refleshSelectStatus(to.name)
    }
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
        case 'UserPostList':
          this.navName = 'posts'
          break;
        case 'UserCommentList':
          this.navName = 'comments'
          break;
        case 'UserAnswerList':
          this.navName = 'answers'
          break;
        case 'UserFollowerList':
          this.navName = 'followers'
          break;
        case 'UserFollowPeopleList':
          this.navName = 'follow-peoples'
          break;
        case 'UserStarPostList':
          this.navName = 'star-posts'
          break;
        case 'UserCollectPostList':
          this.navName = 'collect-posts'
          break;
        case 'UserFollowTopicList':
          this.navName = 'follow-topics'
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.user-center {
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
        .avatar{
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
      .comments,
      .answers,
      .followers,
      .follow-peoples,
      .star-posts,
      .collect-posts,
      .follow-topics {
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
