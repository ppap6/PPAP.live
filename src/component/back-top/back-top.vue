<template>
  <div class="back-top">
    <img id="kotori" src="~common/img/kotori.png" @click="smoothscroll">
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
        document.querySelector('#kotori').style.display = 'block'
      }else{         //否则隐藏
        document.querySelector('#kotori').style.display = 'none'
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
  #kotori {
    position fixed
    bottom -10px
    right -10px
    height 70px
    width 70px
    cursor pointer
    transition 0.2s all
    display block
    z-index 50
  }
  #kotori:hover {
    transform translate(-10px, -10px)
  }
}
</style>