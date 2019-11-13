import Request from './index'

//获取用户登录状态
export function getUserLoginStatus(){
    return Request.get('/user/login/status')
}