import Vue from 'vue'
import Router from 'vue-router'
import Home from 'component/home/home'
import NewPost from 'component/new-post/new-post'
import Notice from 'component/notice/notice'
import ChatList from 'component/chat-list/chat-list'

import PostDetail from 'component/post-detail/post-detail'
import Topic from 'component/topic-detail/topic-detail'

import User from 'component/user/user'
// user 的子组件
import UserPostList from 'component/user/post-list/post-list'
import UserFollowerList from 'component/user/follower-list/follower-list'
import UserFollowPeopleList from 'component/user/follow-people-list/follow-people-list'
import UserFollowPostList from 'component/user/follow-post-list/follow-post-list'
import UserFollowTopicList from 'component/user/follow-topic-list/follow-topic-list'

// notice 的子组件
import NoticeAll from 'component/notice/all/all'
import Comments from 'component/notice/comments/comments'
import Answers from 'component/notice/answers/answers'
import Followers from 'component/notice/followers/followers'
import Likes from 'component/notice/likes/likes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/notice/:id',
      name: 'Notice',
      component: Notice,
      redirect: '/notice/:id',
      children: [
        {
          path: '/notice/:id',
          name: 'NoticeAll',
          component: NoticeAll
        },
        {
          path: '/notice/:id/comments',
          name: 'Comments',
          component: Comments
        },
        {
          path: '/notice/:id/answers',
          name: 'Answers',
          component: Answers
        },
        {
          path: '/notice/:id/followers',
          name: 'Followers',
          component: Followers
        },
        {
          path: '/notice/:id/likes',
          name: 'Likes',
          component: Likes
        }
      ]
    },
    {
      path: '/chats',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      redirect: '/user/:id',
      children: [
        {
          path: '/user/:id',
          name: 'UserPostList',
          component: UserPostList
        },
        {
          path: '/user/:id/followers',
          name: 'UserFollowerList',
          component: UserFollowerList
        },
        {
          path: '/user/:id/follow-peoples',
          name: 'UserFollowPeopleList',
          component: UserFollowPeopleList
        },
        {
          path: '/user/:id/follow-posts',
          name: 'UserFollowPostList',
          component: UserFollowPostList
        },
        {
          path: '/user/:id/follow-topics',
          name: 'UserFollowTopicList',
          component: UserFollowTopicList
        }
      ]
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component: Topic
    },
    {
      path: '*',
      component: Home
    }
  ]
})
