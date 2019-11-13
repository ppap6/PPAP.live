<template>
  <div class="container">
    <router-link :to="`/user/${id}`">
      <img class="profile" :src="avatar" alt>
    </router-link>
    <router-link :to="`/user/${id}`">
      <p class="name">{{name}}</p>
    </router-link>
    <div class="user-information">
      <div class="following">
        <div class="counts">{{follows}}</div>
        <div class="text">关注</div>
      </div>
      <div class="followers">
        <div class="counts">{{fans}}</div>
        <div class="text">粉丝</div>
      </div>
      <div class="posts">
        <div class="counts">{{posts}}</div>
        <div class="text">发帖</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLoginStatus } from 'api/user'

export default {
  data() {
    return {
      id: 0,
      avatar: "https://jwchan.cn/images/avatar.jpg",
      name: "Jwchan",
      follows: '',
      fans: '',
      posts: ''
    }
  },
  created(){
    this.getUserLoginStatus()
  },
  methods: {
    getUserLoginStatus(){
      getUserLoginStatus().then(response => {
        console.log(response)
        if(response.data.status === 200){
          //写入storage
          setStorage('user', response.data.message)
          //更新数据
          this.id = response.data.message.id
          this.name = response.data.message.name
          this.avatar = response.data.message.avatar
          this.posts = response.data.message.posts
          this.fans = response.data.message.fans
          this.follows = response.data.message.follows
        }else{

        }
      }).catch(error => {

      })
    }
  }
}
</script>

<style scoped>
  .container{
    padding: 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
  }

  .profile{
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }

  .name{
    color: #171717;
    font-weight: bold;
  }

  .user-information{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .following,
  .followers,
  .posts{
    width: 20%;
    margin: 10px;
  }

  .counts{
    color: #666666;
    font-size: 14px;
  }

  .text{
    color: #999999;
    font-size: 12px;
  }
</style>
