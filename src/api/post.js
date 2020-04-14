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

//修改帖子
export function updatePost(id, data){
    return Request.put(`/post/${id}`, data)
}

//获取热门帖子列表
export function getHotPostList(data){
    return Request.get('/post/hot', {
        params: data
    })
}