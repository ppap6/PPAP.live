<template>
  <div class="comment-list">
    <div class="container">
      <div class="count" v-if="commentList.length != 0">评论区</div>
      <div class="content">
        <div v-for="item in commentList" :key="item._id">
          <div class="comment-item">
            <router-link :to="`/user/${item.uid}`">
              <img :src="item.avatar" alt="头像">
            </router-link>
            <div class="detail">
              <router-link :to="`/user/${item.uid}`">
                <span class="name">{{item.uname}}</span><span class="author" v-if="authorId == item.uid">楼主</span>
              </router-link>
              <div class="datetime">{{item.create_time}}</div>
              <div class="content">{{item.content}}</div>
              <div class="light-comment">
                <span class="light"><img src="../../common/img/light_0.png">亮了({{item.lights}})</span>
                <span class="comment"><img src="../../common/img/comment.png">回复</span>
              </div>
            </div>
          </div>
          <div class="answer-item" v-for="answer in item.answer_list" :key="answer._id">
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
                <span class="light"><img src="../../common/img/light_0.png">亮了({{answer.lights}})</span>
                <span class="comment"><img src="../../common/img/comment.png">回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList', 'authorId'],
  data() {
    return {
      msg: "我是评论列表组件"
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
      }
    }
  }
}
</style>