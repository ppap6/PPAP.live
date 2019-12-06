<template>
  <div class="all-list">
    <div v-for="item in activityList" :key="item._id">
      <!-- 评论消息 -->
      <div class="activity" v-if="item.type === 1" :key="item._id">
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
          <router-link :to="`/post/${item.pid}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 回复消息 -->
      <div class="activity" v-if="item.type === 2" :key="item._id">
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
        <!-- <span class="text">回复了你</span> -->
        <span class="text">
          <span>回复了&nbsp;</span>
          <router-link :to="`/user/${item.targetor_id}`">
            <p class="name">{{item.targetor_name}}</p>
          </router-link>
        </span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 关注消息 -->
      <div class="activity" v-if="item.type === 3" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <!-- <span class="text">关注了你</span> -->
        <span class="text">
          <span>关注了&nbsp;</span>
          <router-link :to="`/user/${item.targetor_id}`">
            <p class="name">{{item.targetor_name}}</p>
          </router-link>
        </span>
      </div>
      <!-- 点赞消息 -->
      <div class="activity" v-if="item.type === 4" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <!-- <span class="text">点赞了你的文章</span> -->
        <span class="text">
          <span>点赞了&nbsp;</span>
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span>&nbsp;的文章</span>
        </span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="activity" v-if="item.type === 5" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <!-- <span class="text">收藏了你的文章</span> -->
        <span class="text">
          <span>收藏了&nbsp;</span>
          <router-link :to="`/user/${item.uid}`">
            <p class="name">{{item.uname}}</p>
          </router-link>
          <span>&nbsp;的文章</span>
        </span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
      <!-- 关注话题 -->
      <div class="activity" v-if="item.type === 6" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">
          <span>关注了话题&nbsp;</span>
          <router-link :to="`/topic/${item.topic_id}`">
            <p class="name">{{item.topic_name}}</p>
          </router-link>
        </span>
      </div>
       <!-- 关注消息 -->
      <div class="activity" v-if="item.type === 7" :key="item._id">
        <div class="left">
          <router-link :to="`/user/${item.uid}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.uname}}</p>
          </router-link>
        </div>
        <span class="datetime">{{item.create_time}}</span>
        <span class="text">发表了文章</span>
        <div class="right">
          <router-link :to="`/post/${item.pid}`">
            <p class="title">{{item.pname}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonFollowDynamicList } from 'api/person'

export default {
  data () {
    return {
      msg: '我所关注用户的动态的组件',
      pageNum: 1,
      pageSize: 20,
      activityList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞，5为收藏，6为话题，7为发表
      ]
    }
  },
  created(){
    this.getPersonFollowDynamicList()
  },
  methods: {
    getPersonFollowDynamicList(){
      let data = {
        page_num: this.pageNum,
        page_size: this.pageSize
      }
      getPersonFollowDynamicList(data).then(response => {
        console.log(response.data)
        if(response.data.status == 200){
          let activityList = this.activityList
          let list = response.data.message
          this.activityList = list
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.all-list{
  max-width: 720px;
  margin: auto;
  border-radius: 5px;

  .activity{
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
      display: flex;
      flex-direction: row;
      align-items: center;

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
}
</style>
