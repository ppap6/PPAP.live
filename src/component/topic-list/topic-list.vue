<template>
  <div class="container">
    <div class="topic-list">
      <!-- <div class="fixed-label">
        <span @click="selectTopic(0)" :class="{active: activeId === 0}">全部</span>
        <span @click="selectTopic(1)" :class="{active: activeId === 1}">优选</span>
      </div> -->

      <div class="level1-topic" v-for="level1Topic in topicList" :key="level1Topic.id">
        <span
          @click="selectTopic(level1Topic.id)"
          :class="{active: activeId === level1Topic.id}"
        >{{level1Topic.name}}</span>
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
export default {
  props: ["isRouter", "topicList"],
  data() {
    return {
      activeId: 0
    };
  },
  methods: {
    selectTopic(id) {
      this.activeId = id;
      if(!this.isRouter) return
      this.$router.push({path: `/topic/${id}`});
    }
  }
};
</script>

<style scoped lang="stylus">
.container {
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  text-align: left;

  .topic-list {
    padding: 20px 10px;

    span {
      cursor: pointer;
    }

    .fixed-label {
      padding: 0 0 10px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;

      >span {
        font-size: 14px;
        padding: 4px 10px;
        margin: 4px;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }

    .level1-topic {
      padding: 5px 0;

      >span {
        font-size: 14px;
        font-weight: bold;
        padding: 4px 10px;
        margin: 4px;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }

    .level2-topic {
      padding: 5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;

      >span {
        font-size: 14px;
        padding: 4px 10px;
        margin: 4px;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }

    .active {
      color: #FFFFFF;
      background-color: #4170EA !important;
    }
  }
}
</style>
