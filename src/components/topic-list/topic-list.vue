<template>
  <div class="container">
    <div class="topic-list">

      <div class="fixed-label">
        <span @click="selectTopic(0)" :class="{active: activeId === 0}">全部</span>
        <span @click="selectTopic(1)" :class="{active: activeId === 1}">优选</span>
      </div>

      <div class="level1-topic" v-for="level1Topic in topicList">
        <span @click="selectTopic(level1Topic.id)" :class="{active: activeId === level1Topic.id}">{{level1Topic.name}}</span>
        <div class="level2-topic">
          <span @click="selectTopic(level2Topic.id)" 
                v-for="level2Topic in level1Topic.childs"
                :class="{active: activeId === level2Topic.id}"
          >{{level2Topic.name}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 0,
      topicList: [
        {
          id: 2,
          name: "职业",
          childs: [
            {
              id: 5,
              name: "程序员"
            },
            {
              id: 6,
              name: "产品经理"
            },
            {
              id: 7,
              name: "设计师"
            },
            {
              id: 8,
              name: "教师"
            },
            {
              id: 9,
              name: "演员"
            },
            {
              id: 10,
              name: "明星"
            }
          ]
        },
        {
          id: 3,
          name: "技术",
          childs: [
            {
              id: 11,
              name: "React"
            },
            {
              id: 12,
              name: "Vue"
            },
            {
              id: 13,
              name: "React Native"
            },
            {
              id: 14,
              name: "Angular"
            },
            {
              id: 15,
              name: "小程序"
            },
            {
              id: 16,
              name: "NodeJS"
            },
            {
              id: 17,
              name: "JavaScript"
            },
            {
              id: 18,
              name: "Go"
            },
            {
              id: 19,
              name: "Flutter"
            },
            {
              id: 20,
              name: "TypeScript"
            },
            {
              id: 21,
              name: "Webpack"
            }
          ]
        },
        {
          id: 4,
          name: "生活",
          childs: [
            {
              id: 22,
              name: "音乐"
            },
            {
              id: 23,
              name: "动漫"
            },
            {
              id: 24,
              name: "电影"
            },
            {
              id: 25,
              name: "旅游"
            },
            {
              id: 26,
              name: "美食"
            },
            {
              id: 27,
              name: "健康"
            },
            {
              id: 28,
              name: "运动"
            },
            {
              id: 29,
              name: "交友"
            },
            {
              id: 30,
              name: "健身"
            }
          ]
        }
      ]
    }
  },
  methods: {
    selectTopic(id){
      this.activeId = id
    }
  }
}
</script>

<style scoped>
.container {
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  text-align: left;
}

.topic-list {
  padding: 20px 10px;
}

.topic-list span{
  cursor: pointer;
}

.fixed-label{
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.fixed-label>span{
  font-size: 14px;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.level1-topic {
  padding: 5px 0;
}

.level2-topic {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.level1-topic>span {
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.level2-topic>span {
  font-size: 14px;
  padding: 4px 10px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.active{
  color: #FFFFFF;
  background-color: #4170EA !important;
}

.link {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
}

.link-title {
  font-size: 12px;
  font-weight: bold;
  color: #171717;
}

.link-intro {
  font-size: 12px;
  color: #171717;
}
.link a:hover {
  text-decoration: underline;
}
</style>
