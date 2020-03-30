<template>
  <div class="comment-list">
    <div class="container">
      <div class="count" v-if="commentList.length != 0">评论区</div>
      <div class="content">
        <div v-for="comment in commentList" :key="comment._id">
          <div class="comment-item">
            <router-link :to="`/user/${comment.uid}`">
              <img :src="comment.avatar" alt="头像">
            </router-link>
            <div class="detail">
              <router-link :to="`/user/${comment.uid}`">
                <span class="name">{{comment.uname}}</span><span class="author" v-if="authorId == comment.uid">楼主</span>
              </router-link>
              <div class="datetime">{{comment.create_time}}</div>
              <div class="content">{{comment.content}}</div>
              <div class="light-comment">
                <span class="light" @click="lightComment(comment, $event)"><img src="../../common/img/light_0.png">亮了({{comment.lights}})</span>
                <span class="comment" @click="displayCommentInput(comment)"><img src="../../common/img/comment.png">回复</span>
              </div>
              <!-- 评论组件  -->
              <div class="input-bar" v-show="currentItem._id == comment._id">
                <CommentInput class="input" @inputChange="inputChange" :tips="'回复'+comment.uname+'…'"></CommentInput>
                <div class="submit" @click="submitComment(comment)">{{isComment ? '正在提交' : '发表评论'}}</div>
              </div>
            </div>
          </div>
          <div class="answer-item" v-for="answer in comment.answer_list" :key="answer._id">
            <router-link :to="`/user/${answer.requestor_id}`">
              <img :src="answer.requestor_avatar" alt="头像">
            </router-link>
            <div class="detail">
              <div class="answer-point-to">
                <router-link :to="`/user/${answer.requestor_id}`">
                  <span class="name">{{answer.requestor_name}}</span><span class="author" v-if="authorId == answer.requestor_id">楼主</span>
                </router-link>
                <span v-if="answer.type == 2">回复</span>
                <router-link :to="`/user/${answer.targetor_id}`" v-if="answer.type == 2">
                  <span class="targetor">@{{answer.targetor_name}}</span><span class="author" v-if="authorId == answer.targetor_id">楼主</span>
                </router-link>
              </div>
              <div class="datetime">{{answer.create_time}}</div>
              <div class="content">{{answer.content}}</div>
              <div class="light-comment">
                <span class="light" @click="lightAnswer(answer, $event)"><img src="../../common/img/light_0.png">亮了({{answer.lights}})</span>
                <span class="comment" @click="displayCommentInput(answer)" v-if="localUid != answer.requestor_id"><img src="../../common/img/comment.png">回复</span>
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
  </div>
</template>

<script>
import CommentInput from 'component/comment-input/comment-input'
import { answer as comment } from 'api/comment'
import { lightComment, lightAnswer, cancelLightComment, cancelLightAnswer } from 'api/user'
import { getStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  props: ['commentList', 'authorId', 'pid'],
  data() {
    return {
      msg: "我是评论列表组件",
      localUid: getStorage('user').uid,
      //是否正在提交评论
      isComment: false,
      //当前聚焦的评论对象
      currentItem: {}
    }
  },
  components: {
    CommentInput
  },
  methods: {
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
          //向上发起事件
          this.$emit('reloadCommentList')
          //向整个单页面发布事件
          this.$bus.$emit('emptyInputValue')
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
        console.log('服务器丢失了，请稍后重试！')
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
          //向上发起事件
          this.$emit('reloadCommentList')
          //向整个单页面发布事件
          this.$bus.$emit('emptyInputValue')
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
        console.log('服务器丢失了，请稍后重试！')
        this.isComment = false
      })
    },
    //显示评论输入框
    displayCommentInput(item){
      this.currentItem = item
    },
    //点亮评论
    lightComment(comment, e){
      if(comment.is_light){
        cancelLightComment({
          comment_id: comment._id
        }).then(response => {
          if(response.data.status == 200){
            e.target.style.color = '#777777'
            e.target.firstChild.src = require('common/img/light_0.png')
            comment.lights --
            comment.is_light = false
          }else{
            swal({
              title: '点灭失败'
            })
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
            swal({
              title: '点亮失败'
            })
          }
        })
      }
    },
    //点亮回复
    lightAnswer(answer, e){
      if(answer.is_light){
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
            swal({
              title: '点灭失败'
            })
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
            swal({
              title: '点亮失败'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.container{
  margin 15px 0

  .count{
    text-align left
    font-size 14px
    color #515151
    padding 6px 20px
    background-color #FFFFFF
  }

  .content {
    border-radius 5px
    background-color #FFFFFF

    .comment-item {
      position relative
      background-color #FFFFFF
      // border-radius 5px
      padding 10px 20px
      display flex
      flex-direction row
      align-items top
      // cursor pointer
      border-top 1px solid #ECECEC

      img {
        width 40px
        height 40px
        border-radius 50%
        flex-shrink 0

        &:hover{
          text-decoration underline
        }
      }

      .detail {
        padding 0 10px
        text-align left

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
          padding 1px 6px
          margin-left 4px
          color #D6964E
          background-color #232323
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
          padding 4px 0
        }

        .light-comment{
          padding-top 5px
          display flex
          flex-direction row
          align-items center
          
          .light{
            color #777
            font-size 12px
            margin-right 15px
            display flex
            flex-direction row
            align-items center
            cursor pointer

            img{
              width 18px
              height 18px
              margin-right 2px
            }
          }

          .comment{
            color #555
            font-size 12px
            display flex
            flex-direction row
            align-items center
            cursor pointer

            img{
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

    .answer-item {
      position relative
      background-color #FFFFFF
      // border-radius 5px
      padding 10px 20px
      margin-left 50px
      display flex
      flex-direction row
      align-items top
      // cursor pointer
      border-top 1px solid #ECECEC

      img {
        width 40px
        height 40px
        border-radius 50%
        flex-shrink 0

        &:hover{
          text-decoration underline
        }
      }

      .detail {
        padding 0 10px
        text-align left

        .answer-point-to{
          display flex
          flex-direction row
          align-items center;
          font-size 12px

          .name {
            font-size 12px
            color #666666
            font-weight bold

            &:hover{
              text-decoration underline
            }
          }

          .author {
            font-weight bold
            font-size 12px
            padding 1px 6px
            margin-left 4px
            color #D6964E
            background-color #232323
            border-radius 6px
          }

          >span{
            &:before{
              vertical-align center
              color #999999
              font-size 8px
              margin 0 2px 0 2px
              content "\2022"
            }
            &:after{
              vertical-align center
              color #999999
              font-size 8px
              margin 0 2px 0 2px
              content "\2022"
            }
          }

          .targetor{
            font-size 12px
            color #009688
            font-weight bold

            &:hover{
              text-decoration underline
            }
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
          padding 4px 0
        }

        .light-comment{
          padding-top 5px
          display flex
          flex-direction row
          align-items center
          
          .light{
            color #777
            font-size 12px
            margin-right 15px
            display flex
            flex-direction row
            align-items center
            cursor pointer

            img{
              width 18px
              height 18px
              margin-right 2px
            }
          }

          .comment{
            color #555
            font-size 12px
            display flex
            flex-direction row
            align-items center
            cursor pointer

            img{
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
</style>