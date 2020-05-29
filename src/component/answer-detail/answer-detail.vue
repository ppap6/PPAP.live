<template>
  <div class="comment-detail">
    <div class="answer-detail">
      <div class="post">
        <!-- <span class="text">来自：</span> -->
        <router-link :to="`/post/${post.id}`">
          <span class="title">{{post.title}}</span>
        </router-link>
        <div class="content" v-html="post.content != undefined ? post.content.slice(0,40) + '…' : '…'"></div>
      </div>
      <div class="quote">
        <div class="header">
          <img :src="answer_detail.targetor_avatar" alt="" v-if="answer_detail.targetor_avatar != '' && answer_detail.targetor_avatar != null">
          <img src="~common/img/avatar.gif" alt v-else>
          <span class="uname">{{answer_detail.targetor_name}}</span>
        </div>
        <div class="content">{{answer_detail.type == 1 ? answer_detail.comment_content : answer_detail.target_answer_content}}</div>
      </div>
      <div class="requestor">
        <router-link :to="`/user/${answer_detail.requestor_id}`">
          <img :src="answer_detail.requestor_avatar" alt="" v-if="answer_detail.requestor_avatar != '' && answer_detail.requestor_avatar != null">
          <img src="~common/img/avatar.gif" alt="" v-else>
        </router-link>
        <div class="right">
          <router-link :to="`/user/${answer_detail.requestor_id}`">
            <span class="uname">{{answer_detail.requestor_name}}</span>
          </router-link>
          <div class="content">{{answer_detail.content}}</div>
        </div>
      </div>
      <div class="header">
        <span class="datetime">{{answer_detail.create_time}}</span>
        <span class="lights">亮了({{answer_detail.lights}})</span>
      </div>
    </div>
    <div class="answer-list">
      <div class="count">
        <span>评论回复列表</span>
      </div>
      <div class="content">
        <div class="comment-item">
          <router-link :to="`/user/${comment.uid}`">
            <img :src="comment.avatar" alt="头像" v-if="comment.avatar != '' && comment.avatar != null">
            <img src="~common/img/avatar.gif" alt="头像" v-else>
          </router-link>
          <div class="detail">
            <router-link :to="`/user/${comment.uid}`">
              <span class="name">{{comment.uname}}</span>
            </router-link>
            <router-link :to="`/user/${comment.requestor_id}`">
              <!-- <img class="levellevel" src="~common/img/6.png" alt=""> -->
            </router-link>
            <!-- <div class="datetime">{{comment.create_time}}</div> -->
            <div class="content">{{comment.content}}</div>
            <div class="light-comment">
              <span class="datetime">{{comment.create_time}}</span>
              <span class="light" style="color: #777777" @click="lightComment(comment, $event)" v-if="!comment.is_light"><img src="~common/img/light_0.png">亮了({{comment.lights}})</span>
              <span class="light" style="color: #bc3545" @click="lightComment(comment, $event)" v-if="comment.is_light"><img src="~common/img/light_1.png">亮了({{comment.lights}})</span>
              <span class="comment" @click="displayCommentInput(comment)" v-if="currentItem._id != comment._id"><img src="~common/img/comment.png">回复</span>
              <span class="comment" @click="undisplayCommentInput(comment)" v-if="currentItem._id == comment._id"><img src="~common/img/comment.png">取消</span>
            </div>
            <!-- 评论组件  -->
            <div class="input-bar" v-show="currentItem._id == comment._id">
              <CommentInput class="input" @inputChange="inputChange" :tips="'回复'+comment.uname+'…'"></CommentInput>
              <div class="submit" @click="submitComment(comment)">{{isComment ? '正在提交' : '发表评论'}}</div>
            </div>
          </div>
        </div>
        <div :class="answer_detail._id == answer._id ? 'answer-item current' : 'answer-item'" v-for="answer in answerList" :key="answer._id">
          <router-link :to="`/user/${answer.requestor_id}`">
            <img :src="answer.requestor_avatar" alt="头像" v-if="answer.requestor_avatar != '' && answer.requestor_avatar != null">
            <img src="~common/img/avatar.gif" alt="头像" v-else>
          </router-link>
          <div class="detail">
            <div class="answer-point-to">
              <router-link :to="`/user/${answer.requestor_id}`">
                <span class="name">{{answer.requestor_name}}</span>
              </router-link>
              <router-link :to="`/user/${answer.requestor_id}`">
                <!-- <img class="level" src="~common/img/2.png" alt=""> -->
              </router-link>
              <span v-if="answer.type != 2">:</span>
              <span class="point-text" v-if="answer.type == 2">回复</span>
              <router-link :to="`/user/${answer.targetor_id}`" v-if="answer.type == 2">
                <span class="targetor">@{{answer.targetor_name}}</span>：
              </router-link>
              <span class="content">{{answer.content}}</span>
            </div>
            <!-- <div class="datetime">{{answer.create_time}}</div> -->
            <!-- <div class="content">{{answer.content}}</div> -->
            <div class="light-comment">
              <span class="datetime">{{answer.create_time}}</span>
              <span class="light" style="color: #777777" @click="lightAnswer(answer, $event)" v-if="!answer.is_light"><img src="~common/img/light_0.png">亮了({{answer.lights}})</span>
              <span class="light" style="color: #bc3545" @click="lightAnswer(answer, $event)" v-if="answer.is_light"><img src="~common/img/light_1.png">亮了({{answer.lights}})</span>
              <span class="comment" @click="displayCommentInput(answer)" v-if="localUid != answer.requestor_id && currentItem._id != answer._id"><img src="~common/img/comment.png">回复</span>
              <span class="comment" @click="undisplayCommentInput(answer)" v-if="localUid != answer.requestor_id && currentItem._id == answer._id"><img src="~common/img/comment.png">取消</span>
            </div>
            <!-- 评论组件  -->
            <div class="input-bar" v-show="currentItem._id == answer._id">
              <CommentInput class="input" @inputChange="inputChange" :tips="'回复'+answer.requestor_name+'…'"></CommentInput>
              <div class="submit" @click="submitAnswer(answer)">{{isComment ? '正在提交' : '发表评论'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentInput from 'component/comment-input/comment-input'
import { answer as comment, getAnswerDetail } from 'api/comment'
import { lightComment, lightAnswer, cancelLightComment, cancelLightAnswer } from 'api/user'
import { getStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  data(){
    return {
      msg: "我是回复详情组件",
      total: 0,
      localUid: getStorage('user').uid,
      post: {},
      comment: {},
      answer_detail: {},
      //是否正在提交评论
      isComment: false,
      //当前聚焦的评论对象
      currentItem: {},
      answerList: []
    }
  },
  created(){
    this.getAnswerDetail()
  },
  components: {
    CommentInput
  },
  methods: {
    getAnswerDetail(){
      const answerId = this.$route.params.id
      getAnswerDetail(answerId).then(response => {
        if(response.data.status == 200){
          this.post = response.data.message.post
          this.comment = response.data.message.comment
          this.total = response.data.message.answer_list.total
          this.answerList = response.data.message.answer_list.list
          this.answer_detail = response.data.message.answer_detail
        }
      })
    },
    //子组件事件触发函数
    inputChange(val){
      this[this.currentItem._id + '_currentFocusCommentInput_content'] = val
    },
    //回复评论
    submitComment(item){
      if(this[item._id + '_currentFocusCommentInput_content'] == undefined || this[item._id + '_currentFocusCommentInput_content'].trim() == ''){
        swal({
          title: '回复不能为空'
        })
        return
      }
      this.isComment = true
      let data = {
        type: 1,
        pid: item.pid,
        comment_id: item._id,
        targetor_id: item.uid,
        content: this[item._id + '_currentFocusCommentInput_content']
      }
      comment(data).then(response => {
        if(response.data.status == 200){
          this.getAnswerDetail()
          swal({
            title: '回复成功'
          })
          //清空当前回复内容值
          this[item._id + '_currentFocusCommentInput_content'] = ''
          //清空当前回复对象
          this.currentItem = {}
        }else if(response.data.status == 10000){
          swal({
            title: '回复失败'
          })
        }else{
          //不作处理
        }
        this.isComment = false
      }).catch(error => {
        this.isComment = false
      })
    },
    //回复回复
    submitAnswer(item){
      if(this[item._id + '_currentFocusCommentInput_content'] == undefined || this[item._id + '_currentFocusCommentInput_content'].trim() == ''){
        swal({
          title: '回复不能为空'
        })
        return
      }
      this.isComment = true
      let data = {
        type: 2,
        pid: item.pid,
        comment_id: item.comment_id,
        target_answer_id: item._id,
        targetor_id: item.requestor_id,
        content: this[item._id + '_currentFocusCommentInput_content']
      }
      comment(data).then(response => {
        if(response.data.status == 200){
          this.getAnswerDetail()
          swal({
            title: '回复成功'
          })
          //清空当前回复内容值
          this[item._id + '_currentFocusCommentInput_content'] = ''
          //清空当前回复对象
          this.currentItem = {}
        }else if(response.data.status == 10000){
          swal({
            title: '回复失败'
          })
        }else{
          //不作处理
        }
        this.isComment = false
      }).catch(error => {
        this.isComment = false
      })
    },
    //显示评论输入框
    displayCommentInput(item){
      this.currentItem = item
    },
    //取消显示评论输入框
    undisplayCommentInput(item){
      this.currentItem = {}
    },
    //点亮评论
    lightComment(comment, e){
      if(comment.is_light){
        //点灭
        cancelLightComment({
          comment_id: comment._id
        }).then(response => {
          if(response.data.status == 200){
            e.target.style.color = '#777777'
            e.target.firstChild.src = require('common/img/light_0.png')
            comment.lights --
            comment.is_light = false
          }else{
            //不作处理
          }
        })
      }else{
        //点亮
        lightComment({
          comment_id: comment._id
        }).then(response => {
          if(response.data.status == 200){
            e.target.style.color = '#bc3545'
            e.target.firstChild.src = require('common/img/light_1.png')
            comment.lights ++
            comment.is_light = true
          }else if(response.data.status == 10000){
            e.target.style.color = '#bc3545'
            e.target.firstChild.src = require('common/img/light_1.png')
            comment.is_light = true
            swal({
              title: '已点亮'
            })
          }else{
            //不作处理
          }
        })
      }
    },
    //点亮回复
    lightAnswer(answer, e){
      if(answer.is_light){
        //点灭
        cancelLightAnswer({
          answer_id: answer._id
        }).then(response => {
          //点灭
          if(response.data.status == 200){
            e.target.style.color = '#777777'
            e.target.firstChild.src = require('common/img/light_0.png')
            answer.lights --
            answer.is_light = false
          }else{
            //不作处理
          }
        })
      }else{
        //点亮
        lightAnswer({
          answer_id: answer._id
        }).then(response => {
          if(response.data.status == 200){
            e.target.style.color = '#bc3545'
            e.target.firstChild.src = require('common/img/light_1.png')
            answer.lights ++
            answer.is_light = true
          }else if(response.data.status == 10000){
            e.target.style.color = '#bc3545'
            e.target.firstChild.src = require('common/img/light_1.png')
            answer.is_light = true
            swal({
              title: '已点亮'
            })
          }else{
            //不作处理
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.comment-detail {
  position relative
  max-width 700px
  margin auto

  .answer-detail {
    padding 10px 20px 15px 20px
    margin 10px 0
    border-radius 5px
    background-color #ffffff
    text-align left

    .header {
      display flex
      flex-direction row
      align-items center
      justify-content space-between

      .datetime {
        display inline-block
        padding-left 46px
        font-size 12px
        color #999999
      }

      .lights{
        font-size 12px
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

        .uname {
          font-size 12px
          color #666
          margin-left 5px
        }
      }

      .content {
        padding 0 10px 10px 10px
        font-size 14px
      }
    }

    .requestor {
      display flex
      flex-direction row
      align-items top
      justify-content left 
      padding 10px 0 0
      
      img {
        width 36px
        height 36px 
        border-radius 50%
        margin-right 5px
      }

      .right {
        display flex
        flex-direction column
        align-items left
        justify-content center 

        .uname {
          font-size 13px
          color #666
          font-weight bold
          margin-left 5px

          &:hover {
            text-decoration underline
          }
        }
      }
    }

    .content {
      padding 5px 5px 10px
      color #171717
      font-size 14px
    }

    .post {
      font-size 15px
      padding 5px 0

      .text {
        color #515151
        font-weight bold
      }

      .title {
        color #515151
        font-size 20px
        font-weight bold
        border-radius 5px

        &:hover {
          cursor pointer
          text-decoration underline 
        }
      }

      .content {
        padding 5px 0
      }
    }
  }
  
  .answer-list {
    width 700px
    margin-bottom 20px

    .count {
      text-align left
      font-size 14px
      color #515151
      padding 8px 20px
      background-color #FFFFFF
      display flex
      border-bottom 1px solid #ECECEC
      border-top-left-radius 5px
      border-top-right-radius 5px
    }

    .content {
      width 100%
      position relative
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
      padding 10px 0
      background-color #FFFFFF

      .comment-item {
        position relative
        background-color #FFFFFF
        // border-radius 5px
        padding 10px 25px
        display flex
        flex-direction row
        align-items top

        img {
          width 45px
          height 45px
          border-radius 50%
          flex-shrink 0

          &:hover{
            text-decoration underline
          }
        }

        .detail {
          padding 0 10px
          text-align left

          .level {
            display inline-block
            width 30px
            height 15px
            vertical-align middle
          }

          .name {
            font-size 12px
            color #666666
            font-weight bold

            &:hover {
              text-decoration underline
            }
          }

          .author {
            font-weight bold
            font-size 12px
            // padding 1px 6px
            padding 1px 4px
            margin-left 4px
            color #777
            // color #D6964E
            // background-color #232323
            background-color #ececec
            border-radius 6px
          }

          .datetime {
            color #797979
            font-size 12px
          }

          .content {
            font-size 14px
            color #171717
            line-height 20px
            padding 8px 0 2px
          }

          .light-comment {
            padding-top 5px
            display flex
            flex-direction row
            align-items center

            .datetime {
              color #777
              font-size 12px
              margin-right 15px
              display flex
              flex-direction row
              align-items center
              cursor pointer
            } 
            
            .light {
              color #777
              font-size 12px
              margin-right 15px
              display flex
              flex-direction row
              align-items center
              cursor pointer

              img {
                width 18px
                height 18px
                margin-right 2px
              }
            }

            .comment {
              color #555
              font-size 12px
              display flex
              flex-direction row
              align-items center
              cursor pointer

              img {
                width 15px
                height 15px
                margin-right 3px
              }
            }
          }

          .input-bar {
            display flex
            flex-direction row
            align-items center
            justify-content center
            // background #009688
            z-index: 999999;

            .input {
              text-align left
              height 68px
              // background #f2aa24
            }

            .submit {
              width 70px
              height 68px
              padding 4px 15px
              margin auto
              font-size 14px
              box-sizing border-box
              color #fff
              border-radius 4px
              text-align center
              min-width 60px
              cursor pointer
              background-color #4170EA
              border 1px solid #4170EA
              transition .1s
              user-select: none
              outline none
              display flex
              justify-content center
              align-items center

              &:hover {
                opacity 0.9
              }
            }
          }
        }
      }

      .current {
        border-top 1px solid #d9ecff
        border-bottom 1px solid #d9ecff
        background-color #ecf5ff !important

        .detail {
          .content {
            background-color #ecf5ff !important
          }
        }
      }

      .answer-item {
        width calc(100% - 110px)
        position relative
        background-color #FFFFFF
        // border-radius 5px
        padding 10px 30px
        display flex
        flex-direction row
        align-items top
        padding-left 80px

        .level {
          display inline-block
          width 30px
          height 15px
          vertical-align middle
        }

        img {
          width 35px
          height 35px
          border-radius 50%
          flex-shrink 0

          &:hover {
            text-decoration underline
          }
        }

        .detail {
          padding 0 10px
          text-align left

          .answer-point-to {
            // display flex
            // flex-direction row
            // align-items center
            font-size 12px
            line-height 24px

            .name {
              font-size 12px
              color #666666
              font-weight bold

              &:hover {
                text-decoration underline
              }
            }

            .author {
              font-weight bold
              font-size 12px
              // padding 1px 6px
              padding 1px 4px
              margin-left 4px
              color #777
              // color #D6964E
              // background-color #232323
              background-color #ececec
              border-radius 6px
            }

            .point-text {
              &:before {
                vertical-align center
                color #999999
                font-size 8px
                margin 0 2px 0 2px
                content "\2022"
              }
              &:after {
                vertical-align center
                color #999999
                font-size 8px
                margin 0 2px 0 2px
                content "\2022"
              }
            }

            .targetor {
              font-size 12px
              color #009688
              font-weight bold

              &:hover {
                text-decoration underline
              }
            }

            .content {
              padding-left 5px
            }
          }

          .datetime {
            color #797979
            font-size 12px
          }

          .content {
            font-size 14px
            color #171717
            line-height 20px
            padding 8px 0 2px
          }

          .light-comment {
            padding-top 5px
            display flex
            flex-direction row
            align-items center

            .datetime {
              color #777
              font-size 12px
              margin-right 15px
              display flex
              flex-direction row
              align-items center
              cursor pointer
            } 
            
            .light {
              font-size 12px
              margin-right 15px
              display flex
              flex-direction row
              align-items center
              cursor pointer

              img {
                width 18px
                height 18px
                margin-right 2px
              }
            }

            .comment {
              color #555
              font-size 12px
              display flex
              flex-direction row
              align-items center
              cursor pointer

              img {
                width 15px
                height 15px
                margin-right 3px
              }
            }
          }

          .input-bar {
            display flex
            flex-direction row
            align-items center
            justify-content center
            // background #009688
            z-index: 999999;

            .input {
              text-align left
              height 68px
              // background #f2aa24
            }

            .submit {
              width: 70px;
              height: 68px;
              padding: 4px 15px;
              margin auto
              font-size: 14px;
              box-sizing: border-box;
              color: #fff;
              border-radius: 4px;
              text-align: center;
              min-width: 60px;
              cursor: pointer;
              background-color: #4170EA;
              border: 1px solid #4170EA;
              transition: .1s;
              user-select: none;
              outline: none;
              display flex
              justify-content center
              align-items center

              &:hover {
                opacity 0.9
              }
            }
          }
        }
      }
    }
  }
}
</style>