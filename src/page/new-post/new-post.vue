<template>
  <div class="new-post">
    <TopicList @selectTopic="selectTopic" :topicId="topicId"></TopicList>
    <div class="post-header">
      <div class="title-container">
        <span class="text">标题</span>
        <input type="text" class="title" v-model="title" placeholder="请输入文章标题……">
      </div>
      <div class="submit" @click="submit">{{isSubmit ? 'loading…' : '发布'}}</div>
    </div>
    <mavon-editor
      class="editor"
      :externalLink="true"
      v-model="md"
      @change="change">
    </mavon-editor>
  </div>
</template>

<script>
import TopicList from 'component/topic-list/topic-list'
import { addPost } from 'api/post'
import swal from 'sweetalert'

export default {
  name: 'NewPost',
  data() {
    return {
      msg: '我是发帖 markdown 组件',
      topicId: 0,
      title: '',
      md: '',
      content: '',
      isSubmit: false
    };
  },
  components: {
    TopicList
  },
  methods: {
    change(value, render){
      this.md = value
      this.content = render
    },
    submit(){
      if(this.isSubmit){
        swal({
          title: '正在发布'
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
        title: '确定发布文章吗',
        buttons: {
          cancel: '取消',
          confirm: '确定'
        }
      }).then(result => {
        if(result){
          this.addPost()
        }else{
          //取消发布
        }
      })
    },
    //话题子组件传递所选中的话题id
    selectTopic(id){
      this.topicId = id
    },
    //发布帖子
    addPost(){
      this.isSubmit = true
      let data = {
        title: this.title,
        content: this.content,
        md: this.md,
        topic_id: this.topicId
      }
      addPost(data).then(response => {
        if(response.data.status == 200){
          swal({
            title: '发布成功'
          })
          this.topicId = 0
          this.title = ''
          this.md = ''
          this.content = ''
          this.isSubmit = false
          this.$bus.$emit('newPost')
          this.$router.push({
            path: '/'
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

  .editor {
    margin-bottom 20px
  }
}
</style>
