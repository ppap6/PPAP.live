<template>
  <div class="new-post">
    <Loading :loading="loading"></Loading>
    <TopicList @selectTopic="selectTopic" :topicId="topicId"></TopicList>
    <div class="post-header">
      <div class="title-container">
        <span class="text">标题</span>
        <input type="text" class="title" v-model="title" placeholder="请输入文章标题……">
      </div>
      <div class="submit" @click="submit">{{isSubmit ? 'loading…' : '保存'}}</div>
    </div>
    <mavon-editor
      :externalLink="true"
      v-model="md"
      @change="change">
    </mavon-editor>
  </div>
</template>

<script>
import Loading from 'component/loading/loading'
import TopicList from 'component/topic-list/topic-list'
import { getPost, updatePost } from 'api/post'
import swal from 'sweetalert'

export default {
  data() {
    return {
      msg: '我是帖子编辑组件',
      topicId: 0,
      title: '',
      md: '',
      content: '',
      isSubmit: false,
      loading: true
    };
  },
  components: {
    Loading,
    TopicList
  },
  created(){
    this.getPost()
  },
  methods: {
    change(value, render){
      this.md = value
      this.content = render
    },
    submit(){
      if(this.isSubmit){
        swal({
          title: '正在保存'
        })
        return 
      }
      if(!this.topicId){
        swal({
          title: '请选择话题'
        })
        return
      }
      if(this.title.trim().length == 0){
        swal({
          title: '标题不能为空'
        })
        return
      }
      if(this.content.trim().length == 0){
        swal({
          title: '文章内容不能为空'
        })
        return
      }
      swal({
        title: '确定更新文章吗',
        buttons: {
          cancel: '取消',
          confirm: '确定'
        }
      }).then(result => {
        if(result){
          this.updatePost()
        }else{
          //取消保存
        }
      })
    },
    //话题子组件传递所选中的话题id
    selectTopic(id){
      this.topicId = id
    },
    //获取帖子信息
    getPost(){
      let id = this.$route.query.id
      getPost(id).then(response => {
        if(response.data.status == 200){
          this.topicId = response.data.message.topic_id
          this.title = response.data.message.title
          this.md = response.data.message.md
          this.content = response.data.message.content
          //隐藏加载动画
          this.loading = false
        }else if(response.data.status == 10003){
          //隐藏加载动画
          this.loading = false
          swal({
            title: '帖子不存在'
          })
          this.$router.go(-1)
        }else{
          
        }
      }).catch(error => {

      })
    },
    //修改帖子
    updatePost(){
      this.isSubmit = true
      let id = this.$route.query.id
      let data = {
        title: this.title,
        content: this.content,
        md: this.md,
        topic_id: this.topicId
      }
      updatePost(id, data).then(response => {
        if(response.data.status == 200){
          swal({
            title: '修改成功'
          })
          this.$router.go(-1)
        }else{
          swal({
            title: response.data.message
          })
        }
        this.isSubmit = false
      }).catch(error => {
        this.isSubmit = false
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.new-post {
  max-width 1150px
  margin auto
  border-radius 5px
  padding-top 10px

  h1{
    padding 20px
  }

  .post-header{
    display flex
    align-items center
    justify-content left
    background-color #fff
    width 100%
    margin 10px 0
    border-radius 5px

    .title-container{
      width 100%
      display flex
      align-items center

      .text{
        display flex
        align-items center
        justify-content center
        height 40px
        width 80px
        border-right 1px solid #ececec
        background-color #fff
      }

      .title{
        height 20px
        width 100%
        padding 10px 20px
        background-color #fefefe
      }
    }

    .submit{
      display flex
      align-items center
      justify-content center
      font-size 14px
      height 20px
      width 40px
      color #fff
      background-color #4170ea
      padding 10px 30px
      cursor pointer
      transition all 0.1s linear

      &:hover{
        transform scale(1.01)
        box-shadow 0 0 8px #4170ea
      }
    }
  }
}
</style>
