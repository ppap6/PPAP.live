import Request from './index'

//获取用户登录状态
export function getUserLoginStatus(){
    return Request.get('/user/login/status')
}

//用户登录
export function login(data){
    return Request.post('/user/login', data)
}

//用户注册
export function register(data){
    return Request.post('/user/register', data)
}

//获取用户信息
export function getUser(id){
    return Request.get(`/user/${id}`)
}