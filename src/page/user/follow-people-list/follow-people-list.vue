<template>
  <div class="user-follow-people-list">
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
          <span class="followers">粉丝 {{item.fans_count}}</span>
          <span class="follows">关注 {{item.follow_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonFollowList } from 'api/person'

export default {
  data () {
    return {
      msg: '我的关注列表组件',
      followList: []
    }
  },
  created(){
    this.getPersonFollowList()
  },
  methods: {
    getPersonFollowList(){
      let uid = this.$route.params.id
      getPersonFollowList(uid).then(response => {
        if(response.data.status === 200){
          this.followList = response.data.message
        }else if(response.data.status === 10003){
          this.followList = []
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.follow {
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

  .right {
    text-align: left;
    padding: 2px 15px;

    a {
      .name {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
        color: #009688 !important;

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
      color: #616161;

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
