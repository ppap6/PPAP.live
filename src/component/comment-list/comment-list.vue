<template>
  <div class="comment-list">
    <h1>{{msg}}</h1>
    <div class="container">
      <div class="count">2 条评论</div>
      <div class="content">
        <template v-for="item in commentList">
          <div class="comment-item">
            <router-link to="/user/用户id">
              <img :src="item.avatar" alt="头像">
            </router-link>
            <div class="detail">
              <router-link to="/user/用户id">
                <div class="name">{{item.name}}</div>
              </router-link>
              <div class="datetime">{{item.datetime}}</div>
              <div class="content">{{item.content}}</div>
              <div class="light-comment">
                <span class="light"><img src="../../common/img/light_0.png">亮了(0)</span>
                <span class="comment"><img src="../../common/img/comment.png">回复</span>
              </div>
            </div>
          </div>
          <div class="answer-item" v-for="answer in item.answer_list">
            <router-link to="/user/用户id">
              <img :src="answer.avatar" alt="头像">
            </router-link>
            <div class="detail">
              <div class="answer-point-to">
                <router-link to="/user/用户id">
                  <div class="name">{{answer.name}}</div>
                </router-link>
                  回复了
                <router-link to="/user/用户id">
                  <div class="targetor">{{answer.targetor}}</div>
                </router-link>
              </div>
              <div class="datetime">{{answer.datetime}}</div>
              <div class="content">{{answer.content}}</div>
              <div class="light-comment">
                <span class="light"><img src="../../common/img/light_0.png">亮了(0)</span>
                <span class="comment"><img src="../../common/img/comment.png">回复</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是评论列表组件",
      commentList: [
        {
          id: 1,
          name: "大虫子",
          avatar:
            "https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90",
          content: "666啊老哥 🍰",
          datetime: "2019-04-28 15:30:22",
          answer_list: [
            {
              id: 3,
              name: "梁虚天",
              targetor: "大虫子",
              avatar:
                "https://img.xiaoduyu.com/FklxjW19iOahN2nBRdVNvpyaPeao?imageMogr2/thumbnail/!200/quality/90",
              content: "hhhhhhhhhh 🍰",
              datetime: "2019-04-29 10:30:22"
            }
          ]
        },
        {
          id: 2,
          name: "梁虚天",
          avatar:
            "https://img.xiaoduyu.com/FklxjW19iOahN2nBRdVNvpyaPeao?imageMogr2/thumbnail/!200/quality/90",
          content: "我是虚天啊，老铁还记得我吗 🍰",
          datetime: "2019-04-29 10:30:22",
          answer_list: [
            {
              id: 4,
              name: "张家辉",
              targetor: "梁虚天",
              avatar:
                "https://img.xiaoduyu.com/Fo-W531Q9QUpd4V_DTDy6u5c90Vv?imageMogr2/auto-orient/thumbnail/!200/quality/90",
              content: "默认情况下，模块封装每一个依赖，也就是说模块只能在其内部使用组件/控制器。 我们可以将组件实例导出（只有组件可以被导出），这样模块之间就可以共享组件实例了。 🍰",
              datetime: "2019-04-29 10:30:22"
            },
            {
              id: 5,
              name: "郭靖",
              targetor: "张家辉",
              avatar:
                "https://img.xiaoduyu.com/812869a6-26ae-4455-a68f-16a0796153d4.JPG?imageMogr2/crop/!915x915a540a0/thumbnail/!200/quality/90",
              content: "啊哈 🍰",
              datetime: "2019-04-29 10:30:22"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.container{
  // background-color: #FE6533;

  .count{
    text-align: left;
    font-size: 14px;
    color: #515151;
    padding: 6px 20px;
    background-color: #FFFFFF;
  }

  .content {
    border-radius: 5px;
    background-color: #FFFFFF;

    .comment-item {
      position: relative;
      background-color: #FFFFFF;
      // border-radius: 5px;
      padding: 10px 20px;
      display: flex;
      flex-direction: row;
      align-items: top;
      cursor: pointer;
      border-top: 1px solid #ECECEC;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        flex-shrink: 0;

        &:hover{
          text-decoration: underline;
        }
      }

      .detail {
        padding: 0 10px;
        text-align: left;

        .name {
          font-size: 14px;
          color: #333333;
          font-weight: bold;

          &:hover{
            text-decoration: underline;
          }
        }

        .datetime {
          color: #797979;
          font-size: 12px;
        }

        .content {
          font-size: 14px;
          color: #171717;
          line-height: 20px;
          padding: 4px 0;
        }

        .light-comment{
          padding-top: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          
          .light{
            color: #777;
            font-size: 12px;
            margin-right: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
              width: 18px;
              height: 18px;
              margin-right: 2px;
            }
          }

          .comment{
            color: #555;
            font-size: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
              width: 15px;
              height: 15px;
              margin-right: 3px;
            }
          }
        }
      }
    }

    .answer-item {
      position: relative;
      background-color: #FFFFFF;
      // border-radius: 5px;
      padding: 10px 20px;
      margin-left: 50px;
      display: flex;
      flex-direction: row;
      align-items: top;
      cursor: pointer;
      border-top: 1px solid #ECECEC;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        flex-shrink: 0;

        &:hover{
          text-decoration: underline;
        }
      }

      .detail {
        padding: 0 10px;
        text-align: left;

        .answer-point-to{
          display: flex;
          flex-direction: row;
          align-items: center; 
          font-size: 14px;

          .name {
            font-size: 14px;
            color: #333333;
            font-weight: bold;

            &:after{
              vertical-align: center;
              color: #999999;
              font-size: 8px;
              margin: 0 8px 0 8px;
              content: "\2022";
            }

            &:hover{
              text-decoration: underline;
            }
          }

          .targetor{
            font-size: 14px;
            color: #333333;
            font-weight: bold;

            &:hover{
              text-decoration: underline;
            }
          }
        }

        .datetime {
          color: #797979;
          font-size: 12px;
        }

        .content {
          font-size: 14px;
          color: #171717;
          line-height: 20px;
          padding: 4px 0;
        }

        .light-comment{
          padding-top: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          
          .light{
            color: #777;
            font-size: 12px;
            margin-right: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
              width: 18px;
              height: 18px;
              margin-right: 2px;
            }
          }

          .comment{
            color: #555;
            font-size: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
              width: 15px;
              height: 15px;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}
</style>