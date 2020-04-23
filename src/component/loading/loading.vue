<template>
  <div class="loading" v-show="isLoading">
    <img src="~common/img/loading.png" alt="" class="img">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading'],
  computed: {
    isLoading(){
      if(this.loading){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
/* loading加载相关 */
.loading{
  position fixed
  top 0
  left 0
  height 100%
  width 100%
  text-align center
  display flex
  align-items center
  flex-direction column
  justify-content center
  visibility visible
  background-color rgba(0, 0, 0, 0.4)
  z-index 10000

  .img{
    height 50px
    width 50px
    color #fff
    animation load 0.8s linear infinite
  }
  @keyframes load{
    0%{
      transform rotate(0)
    }
    100%{
      transform rotate(360deg)
    }
  }
}
</style>