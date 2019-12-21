<template>
  <div class="container">
    <Loading :loading="loading"></Loading>
    <div class="left">
      <div class="profile-card">
        <ProfileCard></ProfileCard>
      </div>
      <div class="hot-post-card">
        <HotPostCard></HotPostCard>
      </div>
      <div class="link-card">
        <LinkCard></LinkCard>
      </div>
    </div>
    <div class="center post-list">
      <PostList :postList="postList"></PostList>
    </div>
    <div class="right topic-list">
      <TopicList :isRouter="true"></TopicList>
    </div>
  </div>
</template>

<script>
import Loading from 'component/loading/loading'
import TopicList from "component/topic-list/topic-list"
import PostList from "component/post-list/post-list"
import ProfileCard from "component/profile-card/profile-card"
import HotPostCard from "component/hot-post-card/hot-post-card"
import LinkCard from "component/link-card/link-card"

import { getPostList } from 'api/post'

export default {
  name: 'Home',
  data(){
    return {
      postList: [],
      loading: true
    }
  },
  components: {
    Loading,
    ProfileCard,
    HotPostCard,
    LinkCard,
    TopicList,
    PostList
  },
  created(){
    this.getPostList()
  },
  mounted(){
    this.listenScroll()
  },
  methods: {
    listenScroll(){
      window.addEventListener("scroll",this.handleScroll)
    },
    handleScroll(){
      //滚动条滚动事件
      let obtn = document.querySelector('.left');  //获取回到左边视图的ID
      let clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
      //获取滚动条的滚动高度
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(osTop >= 0.55*clientHeight){  //如果滚动高度大于可视区域高度，则隐藏
          obtn.style.display = 'none';
      }else{         //否则显示回到顶部按钮
          obtn.style.display = 'block';
      }
    },
    getPostList(){
      let data = {
        page_num: 1,
        page_size: 20
      }
      getPostList(data).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message
          //隐藏加载动画
          this.loading = false
        }else if(response.data.status === 10003){
          this.postList = []
          //隐藏加载动画
          this.loading = false
        }else{
          //不作处理
          //隐藏加载动画
          this.loading = false
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.container {
  position relative
  max-width 1180px
  margin auto

  .left {
    position fixed
    width 250px
    height 500px
    border-radius 5px

    .profile-card,
    .hot-post-card {
      margin-bottom 10px
    }
  }

  .center {
    position relative
    margin-left 260px
    margin-right 260px
    height 800px
    border-radius 5px
  }

  .right {
    position absolute
    top 0
    right 0
    width 250px
    height 600px
    border-radius 5px
  }
}
</style>