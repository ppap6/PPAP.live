<template>
  <div class="user-follower-list">
    <h1>{{ msg }}</h1>
    <div class="follower" v-for="item in followerList" :key="item.id">
      <div class="left">
        <router-link :to="`/user/${item.id}`">
          <img class="avatar" :src="item.avatar" alt>
        </router-link>
      </div>
      <div class="right">
        <router-link :to="`/user/${item.id}`">
          <p class="name">{{item.name}}</p>
        </router-link>
        <div class="count">
          <span class="comments">评论 {{item.count.comments}}</span>
          <span class="followers">粉丝 {{item.count.followers}}</span>
          <span class="follows">关注用户 {{item.count.follows}}</span>
        </div>
      </div>
      <div class="follow-btn">关注</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我的粉丝列表组件',
      followerList: [
        {
          id: 1,
          name: '撸明恒',
          avatar: 'https://img.xiaoduyu.com/Fs-3Jv_PZa7nFu6BGJXPiTKRVkd6',
          count: {
            comments: 1,
            followers: 1,
            follows: 1
          }
        },
        {
          id: 2,
          name: '两虚天',
          avatar: 'https://img.xiaoduyu.com/FklxjW19iOahN2nBRdVNvpyaPeao?imageMogr2/thumbnail/!200/quality/90',
          count: {
            comments: 2,
            followers: 5,
            follows: 4
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.follower{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: top;
  background-color: #FFFFFF;
  padding: 10px 20px 5px;
  border-radius: 5px;
  margin: 5px 0;

  .left {
    .avatar {
      height: 44px;
      width: 44px;
      border-radius: 50%;
    }
  } 

  .right{
    text-align: left;
    padding: 2px 15px;

    a {
      .name {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
        color: #1c1e25 !important;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .count {
      height: 18px;
      line-height: 24px;
      font-size: 12px;
      font-weight: bold;

      span{
        margin-right: 10px;
      }
    }
  }
  
  .follow-btn{
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
