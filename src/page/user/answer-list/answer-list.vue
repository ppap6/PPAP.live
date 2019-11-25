<!--
 * @Author: jwchan1996
 * @Date: 2019-09-16 23:31:37
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-16 23:31:37
 -->
<template>
  <div class="container">
    <div class="answer-list">
      <router-link :to="`/post/${item.pid}`" v-for="item in answerList" :key="item._id">
        <div class="answer" v-if="item.type == 1">
          <div class="header">
            <span class="datetime">{{item.create_time}}</span>
            <span class="lights">亮了({{item.lights}})</span>
          </div>
          <div class="quote">
            <div class="header">
              <img :src="item.targetor_avatar" alt="">
              <span class="uname">{{item.targetor_name}}</span>
            </div>
            <div class="content">{{item.comment_content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="post">
            <span class="text">来自：</span>
            <span class="title">{{item.ptitle}}</span>
          </div>
        </div>
        <div class="answer" v-if="item.type == 2">
          <div class="header">
            <span class="datetime">{{item.create_time}}</span>
            <span class="lights">亮了({{item.lights}})</span>
          </div>
          <div class="quote">
            <div class="header">
              <img :src="item.targetor_avatar" alt="">
              <span class="uname">{{item.targetor_name}}</span>
            </div>
            <div class="content">{{item.target_answer_content}}</div>
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
import { getPersonAnswerList } from 'api/person'

export default {
  data() {
    return {
      msg: "我的回复列表组件",
      answerList: [
        // //这个是回复
        {
          _id: '5d6a8asd887q633a',    //回复id
          content: '学习了学习了',
          comment_id: '5a45s46f6a6',   //评论id
          comment_content: '有丶东西啊555😂',   //评论内容
          commentor_name: '渣渣辉',    //评论人昵称
          commentor_avatar: 'https://img.xiaoduyu.com/Fs-3Jv_PZa7nFu6BGJXPiTKRVkd6',    //评论人头像
          pid: 1,   //帖子id
          title: 'react + ant-design 构建 web 应用',    //帖子标题
          datetime: '10天前',    //回复时间
          lights: 1   //点亮数
        }
      ]
    }
  },
  created(){
    this.getPersonAnswerList()
  },
  methods: {
    getPersonAnswerList(){
      let uid = this.$route.params.id
      getPersonAnswerList(uid).then(response => {
        if(response.data.status === 200){
          this.answerList = response.data.message
        }else if(response.data.status === 10003){
          this.answerList = []
        }else{
          console.log('服务器开小差了，请稍后重试！')
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

  .answer {
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
