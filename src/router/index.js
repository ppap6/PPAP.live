/*
 * @Author: jwchan1996
 * @Date: 2019-04-22 22:47:02
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2019-12-19 10:35:25
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home/home'
import Follow from 'page/follow/follow'
import NewPost from 'page/new-post/new-post'
import UpdatePost from 'page/update-post/update-post'
import Notice from 'page/notice/notice'
import ChatList from 'page/chat-list/chat-list'
import Search from 'page/search/search'

import PostDetail from 'component/post-detail/post-detail'
import Topic from 'component/topic-detail/topic-detail'
import CommentDetail from 'component/comment-detail/comment-detail'
import AnswerDetail from 'component/answer-detail/answer-detail'

import Login from 'component/login/login'
import Register from 'component/register/register'

import User from 'page/user/user'
// user 的子组件
import UserPostList from 'page/user/post-list/post-list'
import UserCommentList from 'page/user/comment-list/comment-list'
import UserAnswerList from 'page/user/answer-list/answer-list'
import UserFollowerList from 'page/user/follower-list/follower-list'
import UserFollowPeopleList from 'page/user/follow-people-list/follow-people-list'
import UserStarPostList from 'page/user/star-post-list/star-post-list'
import UserCollectPostList from 'page/user/collect-post-list/collect-post-list'
import UserFollowTopicList from 'page/user/follow-topic-list/follow-topic-list'
import UserSettings from 'page/user/settings/settings'

// notice 的子组件
import NoticeAll from 'page/notice/all/all'
import Comments from 'page/notice/comments/comments'
import Answers from 'page/notice/answers/answers'
import Followers from 'page/notice/followers/followers'
import Likes from 'page/notice/likes/likes'
import Collects from 'page/notice/collects/collects'
import Lights from 'page/notice/lights/lights'

//search 的子组件
import SearchPostList from 'page/search/post-list/post-list'
import SearchUserList from 'page/search/user-list/user-list'

import swal from 'sweetalert'
import { getStorage } from 'common/js/localstorage'


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/update-post',
      name: 'UpdatePost',
      component: UpdatePost
    },
    {
      path: '/notice/:id',
      name: 'Notice',
      component: Notice,
      redirect: '/notice/:id',
      children: [
        {
          path: '/notice',
          name: 'NoticeAll',
          component: NoticeAll
        },
        {
          path: '/notice/comments',
          name: 'Comments',
          component: Comments
        },
        {
          path: '/notice/answers',
          name: 'Answers',
          component: Answers
        },
        {
          path: '/notice/followers',
          name: 'Followers',
          component: Followers
        },
        {
          path: '/notice/likes',
          name: 'Likes',
          component: Likes
        },
        {
          path: '/notice/collects',
          name: 'Collects',
          component: Collects
        }
      ]
    },
    {
      path: '/chats',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      redirect: '/search/posts',
      children: [
        {
          path: '/search/posts',
          name: 'SearchPostList',
          component: SearchPostList
        },
        {
          path: '/search/users',
          name: 'SearchUserList',
          component: SearchUserList
        }
      ]
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
          path: '/user/:id/comments',
          name: 'UserCommentList',
          component: UserCommentList
        },
        {
          path: '/user/:id/answers',
          name: 'UserAnswerList',
          component: UserAnswerList
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
          path: '/user/:id/star-posts',
          name: 'UserStarPostList',
          component: UserStarPostList
        },
        {
          path: '/user/:id/collect-posts',
          name: 'UserCollectPostList',
          component: UserCollectPostList
        },
        {
          path: '/user/:id/follow-topics',
          name: 'UserFollowTopicList',
          component: UserFollowTopicList
        }
      ]
    },
    {
      path: '/user/:id/settings',
      name: 'UserSettings',
      component: UserSettings
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
      path: '/comment/:id',
      name: 'CommentDetail',
      component: CommentDetail
    },
    {
      path: '/answer/:id',
      name: 'AnswerDetail',
      component: AnswerDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => { 
  if((to.path == '/follow') || (to.path == '/new-post') || (to.path.search('/notice') != -1) || (to.path.search('/settings') != -1)){
    if(getStorage('user') == ' '){
      //判断未登录状态访问限制路由返回主页
      next({
        path: '/'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router