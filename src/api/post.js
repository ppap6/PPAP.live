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

//增加帖子阅读量
export function addPv(data){
    return Request.post('/post/add/pv', data)
}

//发布帖子
export function addPost(data){
    return Request.post('/post', data)
}