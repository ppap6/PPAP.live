import Request from './index'

//搜索帖子列表（分词）
export function getSearchPostList(keyword){
  return Request.get('/search/post', {
      params: {
          keyword
      }
  })
}

//搜索帖子列表（分字）
export function getSearchPostListByChar(keyword){
  return Request.get('/search/post/char', {
      params: {
          keyword
      }
  })
}

//搜索帖子列表（索引）
export function getSearchPostListByIndex(keyword){
  return Request.get('/search/post/index', {
      params: {
          keyword
      }
  })
}

//搜索用户列表（分词）
export function getSearchUserList(keyword){
  return Request.get('/search/user', {
      params: {
          keyword
      }
  })
}

//搜索用户列表（分字）
export function getSearchUserListByChar(keyword){
  return Request.get('/search/user/char', {
      params: {
          keyword
      }
  })
}