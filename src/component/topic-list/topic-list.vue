<template>
  <div class="container">
    <span class="tips" v-if="!isRouter">请选择话题</span>
    <div class="topic-list">
      <!-- <div class="fixed-label">
        <span @click="selectTopic(0)" :class="{active: activeId === 0}">全部</span>
        <span @click="selectTopic(1)" :class="{active: activeId === 1}">优选</span>
      </div> -->

      <div class="level1-topic" v-for="level1Topic in topicList" :key="level1Topic.id">
        <span
          v-if="isRouter"
          @click="selectTopic(level1Topic.id)"
          :class="{active: activeId === level1Topic.id}"
        >{{level1Topic.name}}</span>
        <span class="level1-name" v-else>{{level1Topic.name}}</span>
        <div class="level2-topic">
          <span
            @click="selectTopic(level2Topic.id)"
            v-for="level2Topic in level1Topic.child"
            :class="{active: activeId === level2Topic.id}"
            :key="level2Topic.id"
          >{{level2Topic.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopicList } from 'api/topic'

export default {
  props: ["isRouter", "topicId"],
  data() {
    return {
      activeId: 0,
      topicList: []
    };
  },
  computed: {
    activeTopicId(){
      return this.topicId
    }
  },
  watch: {
    activeTopicId(id){
      this.activeId = id
    }
  },
  created(){
    this.getTopicList()
  },
  methods: {
    selectTopic(id) {
      this.$emit('selectTopic', id)
      if(this.isRouter){
        this.$router.push({path: `/topic/${id}`})
      }else{
        this.activeId = id
      } 
    },
    getTopicList(){
      getTopicList().then(response => {
        if(response.data.status === 200){
          this.topicList = response.data.message
        }else if(response.data.status === 10003){
          this.topicList = []
        }else{
          //不作处理
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.container {
  background-color hsl(0, 0%, 100%)
  border-radius 5px
  text-align left

  .tips {
    background-color #F54545
    color #fff
    padding 5px 10px
    font-size 12px
    box-shadow 4px 4px 8px #bcbcbc
  }

  .topic-list {
    padding 20px 10px

    span {
      cursor pointer
    }

    .fixed-label {
      padding 0 0 10px 0
      display flex
      flex-direction row
      align-items center
      flex-wrap wrap

      >span {
        font-size 14px
        padding 4px 10px
        margin 4px
        background-color #f2f2f2
        border-radius 5px
      }
    }

    .level1-topic {
      padding 5px 0

      >span {
        font-size 14px
        font-weight bold
        padding 4px 10px
        margin 4px
        background-color #f2f2f2
        border-radius 5px
      }

      .level1-name {
        cursor text
        background-color #fff
      }

      .level2-topic {
        padding 5px 0
        display flex
        flex-direction row
        align-items center
        flex-wrap wrap

        >span {
          font-size 12px
          padding 4px 10px
          margin 4px
          background-color #f2f2f2
          border-radius 5px
        }
      }
    }

    .active {
      color #FFFFFF
      background-color #4170EA !important
    }
  }
}
</style>
