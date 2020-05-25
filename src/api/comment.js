import Request from './index'

//获取评论列表
export function getCommentList(id){
    return Request.get(`/comment/post/${id}`)
}

//添加评论
export function comment(data){
    return Request.post(`/comment`, data)
}

//添加回复
export function answer(data){
    return Request.post(`/answer`, data)
}

//查看评论详情相关信息
export function getCommentDetail(comment_id){
    return Request.get(`/comment/detail/${comment_id}`)
}