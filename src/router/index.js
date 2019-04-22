import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import NewPost from '@/components/new-post/new-post'
import NotificationList from '@/components/notification-list/notification-list'
import ChatList from '@/components/chat-list/chat-list'
import User from '@/components/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new-posts',
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
      path: '*',
      component: Home
    }
  ]
})
