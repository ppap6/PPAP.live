import Request from './index'

//获取用户个人帖子列表
export function getPersonPostList(data){
  return Request.get('/person/post', {
      params: data
  })
}

//获取用户个人评论列表
export function getPersonCommentList(data){
  return Request.get('/person/comment', {
      params: data
  })
}

//获取用户个人回复列表
export function getPersonAnswerList(data){
  return Request.get('/person/answer', {
      params: data
  })
}

//获取用户个人粉丝列表
export function getPersonFansList(data){
  return Request.get('/person/fans', {
      params: data
  })
}

//获取用户个人关注列表
export function getPersonFollowList(data){
  return Request.get('/person/follow', {
      params: data
  })
}

//获取用户个人点赞列表
export function getPersonLikeList(data){
  return Request.get('/person/like', {
      params: data
  })
}

//获取用户个人收藏列表
export function getPersonCollectList(data){
  return Request.get('/person/collect', {
      params: data
  })
}

//获取用户个人关注话题列表
export function getPersonTopicList(data){
  return Request.get('/person/topic', {
      params: data
  })
}

//获取用户关注的用户的动态列表
export function getPersonFollowDynamicList(data){
  return Request.get('/person/dynamic/follow', {
    params: {
      page_num: data.pageNum,
      page_size: data.pageSize
    }
  })
}