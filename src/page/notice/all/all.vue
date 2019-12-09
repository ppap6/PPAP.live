<template>
  <div class="all-list">
    <template v-for="item in noticeList">
      <!-- 评论消息 -->
      <div class="notice" v-if="item.type === 1" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
        <span class="text">留下了评论</span>
        <div class="right">
          <router-link :to="`/post/${item.comment_id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 回复消息 -->
      <div class="notice" v-if="item.type === 2" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
        <span class="text">回复了你</span>
        <div class="right">
          <router-link :to="`/post/${item.answer_id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 关注消息 -->
      <div class="notice" v-if="item.type === 3" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">关注了你</span>
      </div>
      <!-- 点赞消息 -->
      <div class="notice" v-if="item.type === 4" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">点赞了你的文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
      <!-- 收藏消息 -->
      <div class="notice" v-if="item.type === 5" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">收藏了你的文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getNoticeList } from 'api/notice'

export default {
  data () {
    return {
      msg: '全部通知的组件',
      noticeList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞，5为收藏
      ],
      pageNum: 1,
      pageSize: 20
    }
  },
  created(){
    this.getNoticeList()
  },
  methods: {
    getNoticeList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getNoticeList(data).then(response => {
        if(response.data.status == 200){
          this.noticeList = response.data.message
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.notice{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px 0;

  .left {
    a{
      display: flex;
      flex-direction: row;
      align-items: center;

      .avatar {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 6px;
      }

      .name{
        color: #333333;
        font-size: 14px;

        &:hover{
          text-decoration: underline;
        }
      }
    }
  } 

  .datetime{
    font-size: 14px;
    margin-left: 5px;
    color: #999999;
  }

  .text{
    font-size: 14px;
    margin: 0 5px;
    color: #999999;
  }

  .right{
    a {
      .title {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        color: #1c1e25 !important;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
