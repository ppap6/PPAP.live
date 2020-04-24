<template>
  <div class="settings-container">
    <div class="card">
      <div class="nav-header">设置</div>
      <span class="back" @click="back">返回</span>
    </div>
    <div class="card">
      <div class="card-header">头像</div>
      <div class="card-body">
        <img class="avatar" :src="user.avatar" alt v-if="user.avatar">
        <img class="avatar" src="~common/img/avatar.gif" alt v-else>
        <div class="upload">上传头像</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">个性签名</div>
      <div class="card-body">
        <div class="intro">这个人神秘的一匹</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">封面</div>
      <div class="card-body">
        <div class="bg" :style="`background-image: url(${user.bg})`"></div>
        <div class="upload">上传封面</div>
      </div>
    </div>
    <div class="logout" @click="logout" v-if="uid == userId">退出登录</div>
  </div>
</template>

<script>
import { getStorage, removeStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

export default {
  name: 'Settings',
  data(){
    return {
      userId: this.$route.params.id,
      uid: getStorage('user').uid,
      user: getStorage('user')
    }
  },
  methods: {
    logout(){
      swal({
        title: '确定退出登录吗',
        buttons: {
          cancel: '取消',
          confirm: '确定'
        }
      }).then(result => {
        if(result){
          removeStorage('user')
          this.$store.commit('resetToken', undefined)
          this.$router.push({
            path: '/'
          })
        }else{
          //取消退出
        }
      })
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus">
.settings-container{
  position relative
  background-color transparent
  max-width 700px
  margin auto
  border-radius 5px
  
  .logout {
    width 100px
    cursor pointer
    font-size 14px
    background-color #fef0f0
    border 1px solid #fde2e2
    color #f56c6c
    border-radius 20px
    padding 6px 12px
    margin 20px auto
    transition all .1s linear

    &:hover {
      color #fff
      background-color #F54545
      transform scale(1.1)
    }
  }

  .card {
    background-color #fff
    margin-bottom 10px
    border-radius 5px
    border 1px solid #d9ecff

    .nav-header {
      padding 10px 0
      color #171717
      background-color #f8f8f8
      border-radius 5px
    }

    .back {
      position absolute
      top 8px
      right 20px
      cursor pointer
      color #717171
      font-size 14px
      background-color #ececec
      border-radius 15px
      padding 4px 12px
      transition all .1s linear

      &:hover {
        color #fff
        background-color #4170ea
        transform scale(1.1)
      }
    }

    .card-header {
      color #717171
      font-size 14px
      padding 8px 15px
      text-align left 
      border-bottom 1px solid #eff2f6
    }

    .card-body {
      padding 10px 15px
      color #717171
      
      .avatar {
        height 100px
        width 100px
        margin 5px 0 0
        border-radius 50%
      }

      .intro {
        font-size 14px
        text-align left
      }

      .bg {
        height 160px
        width 100%
        padding 0
        margin 5px 0 10px
        background-size cover
        background-position center center
        background-color #565a63
        background-repeat no-repeat
      }

      .upload {
        font-size 14px 
        color #171717
        width 70px
        margin 5px auto
        cursor pointer
      }
    }
  }
}
</style>