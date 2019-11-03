<template>
  <div class="all-list">
    <h1>{{ msg }}</h1>
    <template v-for="item in activityList">
      <!-- 评论消息 -->
      <div class="activity" v-if="item.type === 1" :key="item.id">
        <div class="left">
          <router-link :to="`/user/${item.id}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
        <span class="datetime">17天前</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.post.id}`">
            <p class="title">{{item.post.title}}</p>
          </router-link>
        </div>
        <span class="text">留下了评论</span>
        <div class="right">
          <router-link :to="`/post/${item.post.id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 回复消息 -->
      <div class="activity" v-if="item.type === 2" :key="item.id">
        <div class="left">
          <router-link :to="`/user/${item.id}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
        <span class="datetime">17天前</span>
        <span class="text">在文章</span>
        <div class="right">
          <router-link :to="`/post/${item.post.id}`">
            <p class="title">{{item.post.title}}</p>
          </router-link>
        </div>
        <span class="text">回复了你</span>
        <div class="right">
          <router-link :to="`/post/${item.post.id}`">
            <p class="title">查看详情</p>
          </router-link>
        </div>
      </div>
      <!-- 关注消息 -->
      <div class="activity" v-if="item.type === 3" :key="item.id">
        <div class="left">
          <router-link :to="`/user/${item.id}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
        <span class="datetime">17天前</span>
        <span class="text">关注了你</span>
      </div>
      <!-- 点赞消息 -->
      <div class="activity" v-if="item.type === 4" :key="item.id">
        <div class="left">
          <router-link :to="`/user/${item.id}`">
            <img class="avatar" :src="item.avatar" alt>
            <p class="name">{{item.name}}</p>
          </router-link>
        </div>
        <span class="datetime">17天前</span>
        <span class="text">点赞了你的文章</span>
        <div class="right">
          <router-link :to="`/post/${item.post.id}`">
            <p class="title">{{item.post.title}}</p>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我所关注用户的动态的组件',
      activityList: [
        //type的值 1为评论，2为回复，3为关注，4为点赞
        {
          id: 3,
          name: '郑宇飞',
          avatar: 'https://img.xiaoduyu.com/FnSA2VQBP1s_T_KjDuVKxFZ8EoQp',
          post: {
            id: 5,
            title: '如何实现双向绑定？'
          },
          type: 1       
        },
        {
          id: 8,
          name: '辣子鸡',
          avatar: 'https://img.xiaoduyu.com/586658ea1985b4532700fd0a.jpg?imageMogr2/thumbnail/!200/quality/90',
          post: {
            id: 55,
            title: '深入浅出 webpack'
          },
          type: 1
        },
        {
          id: 90,
          name: '王思冲冲冲',
          avatar: 'https://img.xiaoduyu.com/1554861017000-5cad4b77efbfbb333c4cb509',
          post: {
            id: 58,
            title: '如何实现双向绑定？'
          },
          type: 2
        },
        {
          id: 91,
          name: '有点东西的PDD',
          avatar: 'https://img.xiaoduyu.com/812869a6-26ae-4455-a68f-16a0796153d4.JPG?imageMogr2/crop/!915x915a540a0/thumbnail/!200/quality/90',
          post: {
            id: 59,
            title: '深入浅出 webpack'
          },
          type: 2
        },
        {
          id: 88,
          name: '诸葛孔明',
          avatar: 'https://img.xiaoduyu.com/FiUaikT13Zy0M9yhxFN3iZN5SQKI',
          type: 3
        },
        {
          id: 89,
          name: '波波维奇教练',
          avatar: 'https://img.xiaoduyu.com/FnSA2VQBP1s_T_KjDuVKxFZ8EoQp',
          type: 3
        },
        {
          id: 20,
          name: '郑宇飞',
          avatar: 'https://img.xiaoduyu.com/FnSA2VQBP1s_T_KjDuVKxFZ8EoQp',
          post: {
            id: 5,
            title: '如何实现双向绑定？'
          },
          type: 4
        },
        {
          id: 21,
          name: '辣子鸡',
          avatar: 'https://img.xiaoduyu.com/586658ea1985b4532700fd0a.jpg?imageMogr2/thumbnail/!200/quality/90',
          post: {
            id: 55,
            title: '深入浅出 webpack'
          },
          type: 4
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.all-list{
  max-width: 720px;
  margin: auto;
  border-radius: 5px;

  .activity{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #FFFFFF;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 5px 0;

    .left {
      a{
        display: flex;
        flex-direction: row;
        align-items: center;

        .avatar {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .name{
          color: #333333;
          font-size: 14px;

          &:hover{
            text-decoration: underline;
          }
        }
      }
    } 

    .datetime{
      font-size: 14px;
      margin-left: 5px;
      color: #999999;
    }

    .text{
      font-size: 14px;
      margin: 0 5px;
      color: #999999;
    }

    .right{
      a {
        .title {
          height: 18px;
          line-height: 18px;
          font-size: 14px;
          color: #1c1e25 !important;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
