import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'

const api = process.env.NODE_ENV === 'production' ? '' : '/api'
const baseURL = process.env.NODE_ENV === 'production' ? 'http://www.tengfuchong.com.cn' : ''
const isMock = (url) => url.includes('fastmock')
const server = axios.create({
    timeout: 120000, // 请求超时时间
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // baseURL: HDWX.BASE_URL,
    baseURL,
    withCredentials: true
})

server.interceptors.request.use(config => {
    return {
        ...config,
        url: isMock(config.url) ? config.url : api + config.url
    }
}, error => {
    Promise.reject(error)
})

server.interceptors.response.use(response => {
    return response
}, error => {
    Promise.reject(error)
})

export default ({ method = 'get', url = '', params = {}, data = {}, loadText = '正在加载中' } = {}) => {
    if (method === 'get') {
        return new Promise((resolve, reject) => {
            if (loadText !== false) {
                Vue.prototype.$showLoading({
                    title: loadText
                })
            }
            server.get(url, { params })
            .then(({ status, data }) => {
                if (status === 200) {
                    resolve(data)
                }
            })
            .catch(reason => {
                reject(reason)
            })
            .finally(() => {
                if (loadText !== false) {
                    Vue.prototype.$cancelLoading()
                }
            })
        })
    } else if (method === 'post') {
        return new Promise((resolve, reject) => {
            if (loadText !== false) {
                Vue.prototype.$showLoading({
                    title: loadText
                })
            }
            server.post(url, Qs.stringify(data))
            .then(({ status, data }) => {
                if (status === 200) {
                    resolve(data)
                }
            })
            .catch(reason => {
                reject(reason)
            })
            .finally(() => {
                if (loadText !== false) {
                    Vue.prototype.$cancelLoading()
                }
            })
        })
    }
}
