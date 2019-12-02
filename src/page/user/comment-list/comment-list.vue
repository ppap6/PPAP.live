<!--
 * @Author: jwchan1996
 * @Date: 2019-06-12 20:45:46
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-12 20:45:46
 -->
<template>
  <div class="container">
    <div class="comment-list">
      <router-link :to="`/post/${item.pid}`" v-for="item in commentList" :key="item._id">
        <div class="comment">
          <div class="header">
            <span class="datetime">{{item.create_time}}</span>
            <span class="lights">亮了({{item.lights}})</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="post">
            <span class="text">来自：</span>
            <span class="title">{{item.ptitle}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getPersonCommentList } from 'api/person'

export default {
  data() {
    return {
      msg: "我的回帖列表组件",
      commentList: []
    }
  },
  created(){
    this.getPersonCommentList()
  },
  methods: {
    getPersonCommentList(){
      let uid = this.$route.params.id
      getPersonCommentList(uid).then(response => {
        if(response.data.status === 200){
          this.commentList = response.data.message
        }else if(response.data.status === 10003){
          this.commentList = []
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
.container {
  border-radius: 5px;

  .comment {
    padding: 10px 20px 15px 20px;
    margin: 5px 0;
    border-radius: 5px;
    background-color: #ffffff;
    text-align: left;

    &:hover {
      cursor: pointer;
    }

    .header {
      display flex
      flex-direction row
      align-items center
      justify-content space-between

      .datetime {
        font-size: 14px;
        color #999999
      }

      .lights{
        font-size: 14px;
        color #999999
      }
    }

    .quote{
      border-radius 5px
      background-color #ececec
      margin-top 5px

      .header{
        display flex
        flex-direction row
        align-items center
        justify-content left 
        padding 10px
        
        img{
          width 20px
          height 20px 
          border-radius 50%
        }

        .uname{
          font-size 12px
          color #666
          margin-left 5px
        }
      }

      .content{
        padding 0 10px 10px 10px
        font-size 14px
      }
    }

    .content {
      padding: 10px 0;
      color: #171717;
      font-size: 14px;
    }

    .post {
      font-size: 15px;

      .text{
        color #515151
        font-weight bold
      }

      .title{
        color #009688
        font-weight bold
        border-radius 5px
      }
    }
  }
}
</style>
