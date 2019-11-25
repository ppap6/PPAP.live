import Request from './index'

//搜索帖子列表
export function getSearchPostList(keyword){
  return Request.get('/search/post', {
      params: {
          keyword
      }
  })
}

//搜索用户列表
export function getSearchUserList(keyword){
  return Request.get('/search/user', {
      params: {
          keyword
      }
  })
}