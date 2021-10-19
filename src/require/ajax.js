import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'
import { Dialog } from 'vant'
import store from '@/store'
import { getRamdom } from '@/utils/util'
const api = process.env.NODE_ENV === 'production' ? '' : '/api'
const { PROXY_BASE_URL } = HDWX
const baseURL = process.env.NODE_ENV === 'production' ? PROXY_BASE_URL : ''
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
    config.cancelToken = new axios.CancelToken((cancel) => {
        store.commit('pushToken', { cancelToken: cancel, url: config.url })
    })
    return {
        ...config,
        url: isMock(config.url) ? config.url : api + config.url
    }
}, error => {
    return Promise.reject(error)
})

server.interceptors.response.use(response => {
    if (response.data.code === 90001) { // 缓存失效
        store.commit('resetState')
        // 当检验cookie时，cookie失效，不进行提示
        if (!response.config.url.includes('/mobileMerchant/getDealAccountData')) {
            Dialog.alert({
                title: '提示',
                message: HDWX.WECHAT_BROWSER_ENV ? '登录已过期，请重新打开管理系统' : '登录已过期',
                beforeClose (action, done) {
                    done()
                    wx.closeWindow()
                }
            })
        }
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default ({ method = 'get', url = '', params = {}, data = {}, loadText = '正在加载中' } = {}) => {
    const random = getRamdom()
    if (method === 'get') {
        return new Promise((resolve, reject) => {
            if (loadText !== false) {
                Vue.prototype.$showLoading({
                    title: loadText,
                    key: random
                })
            }
            server.get(url, { params })
            .then(({ status, data } = {}) => {
                if (status === 200) {
                    resolve(data)
                } else {
                    reject(new Error('请求异常'))
                }
            })
            .catch(reason => {
                if (reason && reason.message === '路由跳转取消请求') {
                } else {
                    reject(reason)
                }
            })
            .finally(() => {
                if (loadText !== false) {
                    Vue.prototype.$cancelLoading(random)
                }
            })
        })
    } else if (method === 'post') {
        return new Promise((resolve, reject) => {
            if (loadText !== false) {
                Vue.prototype.$showLoading({
                    title: loadText,
                    key: random
                })
            }
            server.post(url, Qs.stringify(data))
            .then(({ status, data, ...result } = {}) => {
                if (status === 200) {
                    resolve(data)
                } else {
                    reject(new Error('请求异常'))
                }
            })
            .catch(reason => {
                if (reason && reason.message === '路由跳转取消请求') {
                } else {
                    reject(reason)
                }
            })
            .finally(() => {
                if (loadText !== false) {
                    Vue.prototype.$cancelLoading(random)
                }
            })
        })
    }
}
