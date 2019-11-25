import Request from './index'

//搜索帖子列表
export function getSearchPostList(keyword){
  return Request.get('/search/post', {
      params: {
          keyword
      }
  })
}