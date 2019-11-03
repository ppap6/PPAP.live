/*
 * @Author: jwchan1996
 * @Date: 2019-04-22 22:47:02
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-04-22 22:47:02
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home/home'
import Follow from 'page/follow/follow'
import NewPost from 'page/new-post/new-post'
import Notice from 'page/notice/notice'
import ChatList from 'page/chat-list/chat-list'

import PostDetail from 'component/post-detail/post-detail'
import Topic from 'component/topic-detail/topic-detail'

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

// notice 的子组件
import NoticeAll from 'page/notice/all/all'
import Comments from 'page/notice/comments/comments'
import Answers from 'page/notice/answers/answers'
import Followers from 'page/notice/followers/followers'
import Likes from 'page/notice/likes/likes'
import Collects from 'page/notice/collects/collects'
import Lights from 'page/notice/lights/lights'

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
        },
        {
          path: '/notice/:id/collects',
          name: 'Collects',
          component: Collects
        },
        {
          path: '/notice/:id/lights',
          name: 'Lights',
          component: Lights
        },
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
