<template>
  <div class="new-post">
    <TopicList @selectTopic="selectTopic"></TopicList>
    <div class="post-header">
      <div class="title-container">
        <span class="text">标题</span>
        <input type="text" class="title" v-model="title" placeholder="请输入标题……">
      </div>
      <div class="submit" @click="submit">{{isSubmit ? 'loading…' : '发布'}}</div>
    </div>
    <mavon-editor
      :externalLink="true"
      v-model="md"
      @change="change">
    </mavon-editor>
  </div>
</template>

<script>
import TopicList from 'component/topic-list/topic-list'
import { addPost } from 'api/post'

export default {
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
      console.log(value)
      console.log(render)
      this.md = value
      this.content = render
    },
    submit(){
      if(this.isSubmit){
        alert('正在发布')
        return 
      }
      if(confirm("确定要发表该文章吗？")){
        if(!this.topicId){
          alert('请选择话题!')
          return
        }
        if(this.title.trim().length == 0){
          alert('标题不能为空!')
          return
        }
        if(this.content.trim().length == 0){
          alert('文章内容不能为空!')
          return
        }
        this.addPost()
        console.log(this.content)
      }
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
          alert('发布成功')
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
      transition all .1s linear

      &:hover{
        color #fff
        height 40px
        width 40px
        padding 10px 12px
        border-radius 50%
        box-shadow 0 0 15px #aaa
        background-color #4170ea
        transition all .1s linear
        transform scale(1.1)
      }
    }
  }
}
</style>
