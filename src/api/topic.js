import Request from './index'

//获取话题列表
export function getTopicList(){
    return Request.get('/topic')
}