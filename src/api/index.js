import axios from 'axios'
import VM from '../main'
import { getStorage, setStorage, removeStorage } from 'common/js/localstorage'
import swal from 'sweetalert'

const baseURL = 'http://localhost:2333'
// const baseURL = 'http://39.108.65.176:2333'

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
        // const newToken = response.header.new_token == undefined ? false : response.header.new_token
        if(response.headers.new_token){
            //判断返回头是否有new_token字段
            let storage = getStorage('user')
            //更新token
            storage.token = response.headers.new_token
            setStorage('user', storage)
        }
        if(response.data.status == 401){
            //配置请求url白名单
            if(response.config.url.indexOf('/user/login/status') > -1 ){
                //store清除state.token
                VM.$store.commit('resetToken', undefined)
                //清除storage
                removeStorage('user')
                return response
            }else if(response.config.url.indexOf('/user/post/status') > -1){
                return response
            }else if(response.config.url.indexOf('/user/topic/status') > -1){
                return response
            }else if(response.config.url.indexOf('/user/follow/status') > -1){
                return response
            }else{
                //store清除state.token
                VM.$store.commit('resetToken', undefined)
                //清除storage
                removeStorage('user')
                swal({
                    title: '请先登陆'
                }).then(info => {
                    if(info){
                        VM.$router.push({
                            path: '/login'
                        })
                    }
                })
            }
        }else{
            return response
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default request