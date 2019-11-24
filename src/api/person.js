import Request from './index'

//获取用户个人帖子列表
export function getPersonPostList(uid){
  return Request.get('/person/post', {
      params: {
          user_id: uid
      }
  })
}