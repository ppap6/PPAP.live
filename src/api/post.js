import Request from './index'

//获取帖子列表
export function getPostList(data){
    return Request.get('/post', {
        params: data
    })
}

//获取帖子信息
export function getPost(id){
    return Request.get(`/post/${id}`)
}