import Request from './index'

//获取全部通知列表
export function getNoticeList(data){
    return Request.get('/notice/all', {
        params: data
    })
}