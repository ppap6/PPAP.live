import Request from './index'

//获取评论列表
export function getCommentList(id){
    return Request.get(`/comment/post/${id}`)
}

//添加评论
export function comment(data){
    return Request.post(`/comment`, data)
}