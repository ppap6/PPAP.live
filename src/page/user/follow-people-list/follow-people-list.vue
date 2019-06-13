<template>
  <div class="user-follow-people-list">
    <h1>{{ msg }}</h1>
    <div class="follow" v-for="item in followList" :key="item.id">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我的关注列表组件',
      followList: [
        {
          id: 3,
          name: '郑宇飞',
          avatar: 'https://img.xiaoduyu.com/FnSA2VQBP1s_T_KjDuVKxFZ8EoQp',
          count: {
            comments: 20,
            followers: 1,
            follows: 15
          }
        },
        {
          id: 4,
          name: '层出林',
          avatar: 'https://img.xiaoduyu.com/1528538065535-588cbeace0b53fc80c0ed551',
          count: {
            comments: 5,
            followers: 5,
            follows: 80
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.follow{
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
}
</style>
