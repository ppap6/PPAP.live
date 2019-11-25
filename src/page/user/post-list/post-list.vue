<template>
  <div class="container">
    <div class="post-list">
      <PostList :postList="postList"></PostList>
    </div>
  </div>
</template>

<script>
import PostList from 'component/post-list/post-list'
import { getPersonPostList } from 'api/person'

export default {
  data() {
    return {
      postList: []
    }
  },
  components: {
    PostList
  },
  created(){
    this.getPersonPostList()
  },
  methods: {
    getPersonPostList(){
      let uid = this.$route.params.id
      getPersonPostList(uid).then(response => {
        if(response.data.status === 200){
          this.postList = response.data.message
        }else if(response.data.status === 10003){
          this.postList = []
        }else{
          console.log('服务器开小差了，请稍后重试！')
        }
      }).catch(error => {
        console.log('服务器丢失了，请稍后重试！')
      })
    }
  }
};
</script>

<style scoped lang="stylus">
.container {
  border-radius: 5px;
  text-align: left;

  .post {
    padding: 20px 20px 5px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ffffff;

    &:hover{
      cursor: pointer;
    }
  }

  .post-header {
    display: flex;
    flex-direction: row;
    align-items: center;

    .header-left {
      .avatar {
        height: 45px;
        width: 45px;
        border-radius: 50%;
      }
    }

    .header-right {
      padding: 2px 15px;

      a {
        .name {
          height: 18px;
          line-height: 18px;
          font-size: 14px;
          font-weight: bold;
          color: #1c1e25 !important;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .display {
        height: 18px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;

        a {
          .topic {
            font-size: 12px;
            color: #333333 !important;

            &:hover {
              text-decoration: underline;
            }

            &:after {
              vertical-align: center;
              font-size: 8px;
              margin: 0 8px 0 8px;
              content: "\2022";
            }
          }
        }

        .datetime {
          font-size: 12px;
          color: #999999;
        }
        

      }
    }
  }

  .post-content{
    padding: 5px 0;

    a {
      .post-title{
        color: #1c1e25 !important;
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;

        &:hover{
          text-decoration: underline;
        }
      }
    }

    .post-summary{
      font-size: 14px;
    }

    .statistics{
      padding: 5px 0 0 0;

      .reads,
      .comments,
      .answers,
      .likes,
      .collects{
        font-size: 14px;
        color: #999999;
        margin-right: 15px;
      }
    }
  }
}
</style>
