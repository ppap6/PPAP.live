import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import NewPost from '@/components/new-post/new-post'
import NotificationList from '@/components/notification-list/notification-list'
import ChatList from '@/components/chat-list/chat-list'
import User from '@/components/user/user'
import PostDetail from '@/components/post-detail/post-detail'
import TopicDetail from '@/components/topic-detail/topic-detail'

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
      component: User
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
