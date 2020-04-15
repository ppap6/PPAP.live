<template>
  <div class="container">
    <div class="loadmore" v-if="state == true">
      <img class="icon" src="~common/img/loading.png" alt="">
      <span class="tips">正在加载</span>
    </div>
    <div class="baseline" v-if="state == false">———— 没有更多数据了 ————</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingBottom',
  props: ['state']
}
</script>

<style scoped lang="stylus">
  .container {
    .loadmore {
      display flex
      align-items center
      justify-content center
      height 36px
      background-color #fff

      .icon {
        height 20px
        width 20px
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
      .tips {
        font-size 12px
        margin-left 5px
      }
    }

    .baseline {
      font-size 12px
      color #777
      padding 10px 0
    }
  }
</style>