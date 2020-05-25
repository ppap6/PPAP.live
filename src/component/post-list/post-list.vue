<template>
  <div class="post-list-container">
    <div class="sort-bar" v-if="displaySortBar">
      <div :class="{'create-time': true, 'active': currentSort == 1}" @click="sort(1)">最新发布</div>  
      <div :class="{'last-answer-time': true, 'active': currentSort == 2}" @click="sort(2)">最新回复</div>  
      <div :class="{'hots': true, 'active': currentSort == 3}" @click="sort(3)">热门讨论</div>  
    </div>
    <div class="post-list">
      <div class="post" v-for="post in list" :key="post.id">
        <div class="post-header">
          <div class="header-left">
            <router-link :to="`/user/${post.uid}`" v-if="!useInPerson">
              <img class="avatar" :src="post.avatar" alt v-if="post.avatar != '' && post.avatar != null">
              <img class="avatar" src="~common/img/avatar.gif" alt v-else>
            </router-link>
          </div>
          <div class="header-right">
            <router-link :to="`/user/${post.uid}`" v-if="!useInPerson">
              <p class="name">{{post.uname}}</p>
            </router-link>
            <div class="display">
              <router-link :to="`/topic/${post.topic_id}`" :target="useInPerson ? '_blank' : ''">
                <span class="topic">{{post.topic_name}}</span>
              </router-link>
              <span class="datetime">{{post.create_time}}</span>
            </div>
          </div>
        </div>
        <div class="post-content">
          <router-link :to="`/post/${post.id}`" :target="useInPerson ? '_blank' : ''">
            <div class="post-title" v-html="post.title"></div>
          </router-link>
          <div class="post-summary" v-if="!useInPerson" v-html="post.content.slice(0,40) + '…'"></div>
          <div class="statistics">
            <span class="reads" v-if="post.pv">{{post.pv}} 阅读</span>
            <span class="comments" v-if="post.comments">{{post.comments}} 评论</span>
            <span class="answers" v-if="post.answers">{{post.answers}} 回复</span>
            <span class="likes" v-if="post.likes">{{post.likes}} 赞</span>
            <span class="collects" v-if="post.collects">{{post.collects}} 收藏</span>
          </div>
        </div>
      </div>
    </div>
    <img class="nofound" src="~common/img/404.svg" v-if="noData" />
  </div>
</template>

<script>
export default {
  props: ['postList', 'noData', 'useInPerson', 'sortBar'],
  data() {
    return {
      currentSort: 1
    }
  },
  computed: {
    list(){
      return this.postList
    },
    displaySortBar(){
      return this.sortBar ? true : false
    }
  },
  mounted(){
    if(this.$route.query.sort){
      this.currentSort = this.$route.query.sort
    }
  },
  watch: {
    $route(to, from){
      if(to.query.sort){
        this.currentSort = this.$route.query.sort
      }else{
        this.currentSort = 1
      }
    }
  },
  methods: {
    sort(type){
      this.currentSort = type
      this.$router.replace({
        query: {
          sort: type
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.post-list-container {
  text-align center
  border-radius 5px

  .sort-bar {
    display flex
    flex-direction row
    align-items center
    // background-color transparent
    background-color #fff
    border-radius 5px
    margin-bottom 10px
    padding 5px 10px

    .create-time, .last-answer-time, .hots {
      padding 5px 10px
      margin-right 5px
      border-radius 20px
      background-color #f8f8f8
      font-size 12px
      cursor pointer
      color #999
      transition all 0.3s
      
      &:hover {
        color #409eff
        border 1px solid #d9ecff
      }
    }

    .active {
      background-color #ecf5ff
      color #409eff
      border 1px solid #d9ecff
    }
  }

  .post-list {
    text-align left
    
    .post {
      padding 10px 20px 5px 20px
      margin-bottom 10px
      border-radius 5px
      background-color #ffffff

      .post-header {
        display flex
        flex-direction row
        align-items center

        .header-left {
          .avatar {
            height 45px
            width 45px
            border-radius 50%
            margin-right 10px
          }
        }

        .header-right {
          padding 2px 15px 2px 0

          a{
            .name {
              height 18px
              line-height 18px
              font-size 13px
              font-weight bold
              color #444

              &:hover{
                text-decoration underline
              }
            }
          }

          .display {
            height 18px
            line-height 18px
            font-size 14px
            
            .topic {
              font-size 12px
              color #333333 !important

              &:hover {
                text-decoration underline
              }

              &:after {
                vertical-align center
                font-size 8px
                margin 0 8px 0 8px
                content "\2022"
              }
            }

            .datetime {
              font-size 12px
              color #999999
            }
          }
        }
      }

      .post-content{
        padding 5px 0

        .post-title{
          color #424242 !important
          font-size 17px
          font-weight bold
          padding-bottom 5px

          &:hover{
            text-decoration underline
          }
        }

        .post-summary{
          font-size 14px
        }

        .statistics{
          padding 5px 0 0 0

          .reads,
          .comments,
          .answers,
          .likes,
          .collects{
            font-size 12px
            color #999999
            margin-right 10px
          }
        }
      }
    }
  }

  .nofound {
    height 200px
    width 200px
    margin auto
  }
}
</style>
