<template>
  <div class="back-top">
    <img id="kotori" src="~common/img/kotori.png" @click="smoothscroll" />
    <p class="tips">回到顶部</p>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  mounted(){
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(){         
      //获取滚动高度
      let osTop = document.documentElement.scrollTop || document.body.scrollTop
      //可视区域高度
      let clientHeight = document.documentElement.clientHeight
      //如果滚动高度大于可视区域高度，则显示回到顶部按钮
      if(osTop >= clientHeight/3){      
        document.querySelector('#kotori').style.opacity = 1
      }else{         //否则隐藏
        document.querySelector('#kotori').style.opacity = 0
      }
    },
    smoothscroll(){
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.smoothscroll)
        window.scrollTo (0, currentScroll - (currentScroll/10))
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.back-top {
  .tips {
    position fixed
    bottom 80px
    right 5px
    cursor pointer
    transition 0.2s all
    font-size 14px
    z-index 50
    background-color #ccc
    padding 5px 10px
    border-radius 5px
    opacity 0

    &:hover span{
      color red
    }

    &:after {
      border-right 10px solid transparent
      border-left 10px solid transparent
      border-top 10px solid #ccc
      position absolute
      bottom -10px
      right 20px
      content ''
    }
  }
  #kotori {
    position fixed
    bottom -10px
    right -10px
    height 70px
    width 70px
    cursor pointer
    transition 0.2s all
    z-index 50

    &:hover {
      transform translate(-10px, -10px)
    }
    &:hover +.tips {
      opacity 1
    }
  }
}

@media screen and (max-width: 414px) {
  .back-top {
    display none
  }
}
</style>