<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <div class="comment-list">
      <router-link to="/post/帖子id" v-for="item in commentList" :key="item._id">
        <div class="comment" v-if="!item.comment_id">
          <div class="header">
            <span class="text">你&nbsp;</span>
            <span class="datetime">{{item.datetime}}</span>
            <span class="text">&nbsp;在&nbsp;</span>
            <span class="title">{{item.title}}</span>
            <span class="text">&nbsp;中的回复被亮了&nbsp;</span>
            <span class="lights">{{item.lights}}</span>
            <span class="text">&nbsp;次</span>
          </div>
          <div class="content">{{item.content}}</div>
          <!-- <div class="post">
            <span class="text">来自：</span>
            <span class="title">{{item.title}}</span>
          </div> -->
        </div>
        <div class="comment" v-if="item.comment_id">
          <div class="header">
            <span class="text">你&nbsp;</span>
            <span class="datetime">{{item.datetime}}</span>
            <span class="text">&nbsp;在&nbsp;</span>
            <span class="title">{{item.title}}</span>
            <span class="text">&nbsp;中的回复被亮了&nbsp;</span>
            <span class="lights">{{item.lights}}</span>
            <span class="text">&nbsp;次</span>
          </div>
          <div class="quote">
            <div class="header">
              <img :src="item.commentor_avatar" alt="">
              <span class="uname">{{item.commentor_name}}</span>
            </div>
            <div class="content">{{item.comment_content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <!-- <div class="post">
            <span class="text">来自：</span>
            <span class="title">{{item.title}}</span>
          </div> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "亮了通知的组件",
      commentList: [
        //这个是评论
        {
          _id: '4a56q4s23a467q',   //评论id
          content: '有丶东西啊666😂有丶东西啊666😂有丶东西啊666😂有丶东西啊666😂有丶东西啊666😂有丶东西啊666😂',    //评论内容
          pid: 1,   //帖子id
          title: '这是我的第一个帖子？？？',    //帖子标题
          datetime: '10天前',    //评论时间
          lights: 2   //点亮数
        },
        //这个是回复
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
    };
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius 5px

  .comment {
    padding 10px 20px 5px 20px
    margin 5px 0
    border-radius 5px
    background-color #ffffff
    text-align left

    &:hover {
      cursor pointer
    }

    .header {
      display flex
      flex-direction row
      align-items center

      .text{
        color #555
        font-size 14px
      }

      .datetime {
        font-size 14px
        color #999999
      }

      .title{
        font-size 14px
        color #009688
      }

      .lights{
        font-size 14px
        color #009688
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
      padding 10px 0
      color #171717
      font-size 14px
    }
  }
}
</style>
