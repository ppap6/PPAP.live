import axios from 'axios'
import { getStorage } from 'common/js/localstorage'

// const baseURL = 'http://localhost:2333'
const baseURL = 'http://39.108.65.176:2333'

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
})
  
request.interceptors.request.use(
    config => {
        config.headers.common["Authorization"] = "Bearer " + getStorage("user").token
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default request