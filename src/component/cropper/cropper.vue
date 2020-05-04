<template>
  <div class="cropper">
    <VueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :fixed="option.fixed"
      :fixedBox="option.fixedBox"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :original="option.original"
      :centerBox="option.centerBox"
      :maxImgSize="option.maxImgSize"
      :mode="option.mode"
    ></VueCropper>
    <div class="func">
      <div class="confirm" @click="getCropData">确定</div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper' 

export default {
  name: 'Cropper',
  props: ['img'],
  data(){
    return {
      option: {
        img: this.img,
        size: 0.1,
        outputType: "png",
        fixed: true,
        fixedBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 200,
        original: true,
        centerBox: true,
        cropData: {},
        mode: 'contain',
        maxImgSize: 500
      },
    }
  },
  components: {
    VueCropper
  },
  methods: {
    getCropData(){
      this.$refs.cropper.getCropData(data => {
        console.log(data)
      })
    },
    cancel(){
      this.$emit('cancelCropData', true)
    }
  }
}
</script>

<style scoped lang="stylus">
.cropper {
  .func {
    display flex
    align-items center
    justify-content center

    .confirm {
      color #409eff
      background #ecf5ff
      border 1px solid #b3d8ff
      padding 5px 15px
      border-radius 20px
      cursor pointer
      font-size 14px
      margin 4px
    }
    .cancel {
      color #f56c6c
      background #fef0f0
      border 1px solid #fbc4c4
      padding 5px 15px
      border-radius 20px
      cursor pointer
      font-size 14px
      margin 4px
    }
  }
}
</style>