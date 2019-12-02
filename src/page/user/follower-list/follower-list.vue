<template>
  <div class="user-fans-list">
    <div class="follower" v-for="item in fansList" :key="item.id">
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
          <span class="fans">粉丝 {{item.fans_count}}</span>
          <span class="follows">关注 {{item.follow_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonFansList } from 'api/person'

export default {
  data () {
    return {
      msg: '我的粉丝列表组件',
      fansList: []
    }
  },
  created(){
    this.getPersonFansList()
  },
  methods: {
    getPersonFansList(){
      let uid = this.$route.params.id
      getPersonFansList(uid).then(response => {
        if(response.data.status === 200){
          this.fansList = response.data.message
        }else if(response.data.status === 10003){
          this.fansList = []
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
}
</style>
