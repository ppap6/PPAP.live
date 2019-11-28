import axios from 'axios'
import { getStorage, setStorage, removeStorage } from 'common/js/localstorage'

// const baseURL = 'http://localhost:2333'
const baseURL = 'http://39.108.65.176:2333'

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
})
  
request.interceptors.request.use(
    config => {
        config.headers.common['Authorization'] = 'Bearer ' + getStorage('user').token
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        if(response.data.status === 401){
            //配置请求url白名单
            if(response.config.url.indexOf('/user/login/status') > -1 ){
                return response
            }else if(response.config.url.indexOf('/user/post/status') > -1){
                return response
            }else if(response.config.url.indexOf('/user/topic/status') > -1){
                return response
            }
            //清除storage
            removeStorage('user')
            alert('请先登录！')
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default request