<template>
  <div class="comment-list">
    <h1>{{msg}}</h1>
    <div class="container">
      <div class="count">2 条评论</div>
      <div class="content">
        <template v-for="item in commentList">
          <div class="comment-item">
            <img :src="item.avatar" alt="头像">
            <div class="detail">
              <div class="name">{{item.name}}</div>
              <div class="last-message">{{item.last_message}}</div>
              <div class="last-datetime">{{item.last_datetime}}</div>
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
          name: '大虫子',
          avatar: 'https://img.xiaoduyu.com/dcb97678-d958-4210-be43-6ebd5ebcc5c5.png?imageMogr2/crop/!1200x1200a593a43/thumbnail/!200/quality/90',
          last_message: '666啊老哥 🍰',
          last_datetime: '2019-04-28 15:30:22'
        },
        {
          id: 2,
          name: '梁虚天',
          avatar: 'https://img.haosuzhou.com/4fbb8bc2-36fd-4eec-813c-6de619025e94.gif?imageMogr2/crop/!234x234a6a11/thumbnail/!200/quality/90',
          last_message: '我是虚天啊，老铁还记得我吗 🍰',
          last_datetime: '2019-04-29 10:30:22'
        },
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.comment-item{
  position: relative;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 10px; 
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: top;
  cursor: pointer;

  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .detail{
    padding: 0 10px;
    text-align: left;

    .name{
      font-size: 14px;
      color: #333333;
      font-weight: bold;
    }

    .last-message{
      font-size: 14px;
      color: #515151;
    }
  }

  .last-datetime{
    color: #797979;
    font-size: 12px;
  }
}
</style>