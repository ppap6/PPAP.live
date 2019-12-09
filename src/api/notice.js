import Request from './index'

//获取全部通知列表
export function getNoticeList(data){
    return Request.get('/notice/all', {
        params: data
    })
}

//获取关注通知列表
export function getFollowNoticeList(data){
    return Request.get('/notice/follow', {
        params: data
    })
}

//获取回复通知列表
export function getAnswerNoticeList(data){
    return Request.get('/notice/answer', {
        params: data
    })
}

//获取评论通知列表
export function getCommentNoticeList(data){
    return Request.get('/notice/comment', {
        params: data
    })
}