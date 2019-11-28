import Request from './index'

//获取话题列表
export function getTopicList(){
    return Request.get('/topic')
}

//获取话题信息
export function getTopic(id){
    return Request.get(`/topic/${id}`)
}