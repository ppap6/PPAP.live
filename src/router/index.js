import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import NewPost from '@/components/new-post/new-post'
import Notice from '@/components/notice/notice'
import ChatList from '@/components/chat-list/chat-list'

import PostDetail from '@/components/post-detail/post-detail'
import Topic from '@/components/topic-detail/topic-detail'

import User from '@/components/user/user'
// user 的子组件
import UserPostList from '@/components/user/post-list/post-list'
import UserFollowerList from '@/components/user/follower-list/follower-list'
import UserFollowPeopleList from '@/components/user/follow-people-list/follow-people-list'
import UserFollowPostList from '@/components/user/follow-post-list/follow-post-list'
import UserFollowTopicList from '@/components/user/follow-topic-list/follow-topic-list'

// notice 的子组件
import NoticeAll from '@/components/notice/all/all'
import Comments from '@/components/notice/comments/comments'
import Answers from '@/components/notice/answers/answers'
import Followers from '@/components/notice/followers/followers'
import Likes from '@/components/notice/likes/likes'

Vue.use(Router)

export default new Router({
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
