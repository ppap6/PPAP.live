<template>
  <div class="cropper-container">
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
      :fixedNumber="option.fixedNumber"
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
  props: ['img', 'type'],
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
        autoCropWidth: this.type == 2 ? 600 : 150,
        autoCropHeight: 150,
        original: true,
        centerBox: false,
        cropData: {},
        mode: '',
        maxImgSize: 500,
        //根据type类型决定截图比例
        fixedNumber: [(this.type == 2 ? 4 : 1), 1]
      },
    }
  },
  components: {
    VueCropper
  },
  methods: {
    getCropData(){
      this.$refs.cropper.getCropData(data => {
        this.$emit('getCropData', data)
      })
    },
    cancel(){
      this.$emit('cancelCropData', true)
    }
  }
}
</script>

<style scoped lang="stylus">
.cropper-container {
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