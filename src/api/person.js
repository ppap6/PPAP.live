import Request from './index'

//获取用户个人帖子列表
export function getPersonPostList(uid){
  return Request.get('/person/post', {
      params: {
          user_id: uid
      }
  })
}

//获取用户个人评论列表
export function getPersonCommentList(uid){
  return Request.get('/person/comment', {
      params: {
          user_id: uid
      }
  })
}

//获取用户个人回复列表
export function getPersonAnswerList(uid){
  return Request.get('/person/answer', {
      params: {
          user_id: uid
      }
  })
}

//获取用户个人粉丝列表
export function getPersonFansList(uid){
  return Request.get('/person/fans', {
      params: {
          user_id: uid
      }
  })
}

//获取用户个人关注列表
export function getPersonFollowList(uid){
  return Request.get('/person/follow', {
      params: {
          user_id: uid
      }
  })
}