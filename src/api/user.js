import Request from './index'

//获取用户登录状态
export function getUserLoginStatus(){
    return Request.get('/user/login/status')
}

//用户登录
export function login(data){
    return Request.post('/user/login', data)
}

//获取邮箱验证码
export function getVerify(email){
    return Request.get('/user/verify', {
        params: {
            email
        }
    })
}

//用户注册
export function register(data){
    return Request.post('/user/register', data)
}

//获取用户信息
export function getUser(id){
    return Request.get(`/user/${id}`)
}

//用户关注话题
export function followTopic(data){
    return Request.post('/user/follow/topic', data)
}

//用户取消关注话题
export function cancelFollowTopic(data){
    return Request.post('/user/cancel/follow/topic', data)
}

//获取用户对话题的关注状态
export function getUserTopicStatus(id){
    return Request.get(`/user/topic/status/${id}`)
}

//用户点赞帖子
export function likePost(data){
    return Request.post('/user/like/post', data)
}

//用户取消点赞帖子
export function cancelLikePost(data){
    return Request.post('/user/cancel/like/post', data)
}

//用户收藏帖子
export function collectPost(data){
    return Request.post('/user/collect/post', data)
}

//用户取消收藏帖子
export function cancelCollectPost(data){
    return Request.post('/user/cancel/collect/post', data)
}

//获取用户对帖子的点赞收藏状态
export function getUserPostStatus(id){
    return Request.get(`/user/post/status/${id}`)
}

//用户关注
export function followUser(data){
    return Request.post('/user/follow', data)
}

//用户取消关注
export function cancelFollowUser(data){
    return Request.post('/user/cancel/follow', data)
}

//获取用户对用户的关注状态
export function getUserFollowStatus(id){
    return Request.get(`/user/follow/status/${id}`)
}

//用户点亮评论
export function lightComment(data){
    return Request.post(`/user/light/comment`, data)
}

//用户点亮回复
export function lightAnswer(data){
    return Request.post(`/user/light/answer`, data)
}

//用户取消点亮评论
export function cancelLightComment(data){
    return Request.post(`/user/cancel/light/comment`, data)
}

//用户取消点亮回复
export function cancelLightAnswer(data){
    return Request.post(`/user/cancel/light/answer`, data)
}