import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import NewPost from '@/components/new-post/new-post'
import NotificationList from '@/components/notification-list/notification-list'
import ChatList from '@/components/chat-list/chat-list'

import PostDetail from '@/components/post-detail/post-detail'
import TopicDetail from '@/components/topic-detail/topic-detail'

import User from '@/components/user/user'
// user 的子组件
import UserPostList from '@/components/user/post-list/post-list'
import UserFollowerList from '@/components/user/follower-list/follower-list'
import UserFollowPeopleList from '@/components/user/follow-people-list/follow-people-list'
import UserFollowPostList from '@/components/user/follow-post-list/follow-post-list'
import UserFollowTopicList from '@/components/user/follow-topic-list/follow-topic-list'

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
      path: '/notifications',
      name: 'NotificationList',
      component: NotificationList
    },
    {
      path: '/chats',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      redirect: '/user',
      children: [
        {
          path: '/user',
          name: 'UserPostList',
          component: UserPostList
        },
        {
          path: '/user/followers',
          name: 'UserFollowerList',
          component: UserFollowerList
        },
        {
          path: '/user/follow-peoples',
          name: 'UserFollowPeopleList',
          component: UserFollowPeopleList
        },
        {
          path: '/user/follow-posts',
          name: 'UserFollowPostList',
          component: UserFollowPostList
        },
        {
          path: '/user/follow-topics',
          name: 'UserFollowTopicList',
          component: UserFollowTopicList
        }
      ]
    },
    {
      path: '/post-detail',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/topic-detail',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '*',
      component: Home
    }
  ]
})
