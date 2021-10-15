// mutations
import { getType } from '@/utils/util'
import { initState } from '../state'
const HDWX_STATE = '__hdwx_state__'
export default {
    setGlobalData (state, globalData) {
        if (getType(globalData) !== 'object') throw new TypeError('globalData is not Object')
        state.global = { ...state.global, ...globalData }
        sessionStorage.setItem(HDWX_STATE, JSON.stringify(state))
    },
    setUser (state, userInfo) {
        state.user = { ...state.user, ...userInfo }
        sessionStorage.setItem(HDWX_STATE, JSON.stringify(state))
    },
    // 重新设置state
    resetState (state) {
        state = initState
        sessionStorage.setItem(HDWX_STATE, JSON.stringify(state))
    },
    pushToken (state, payload) {
        state.cancelTokenList.push(payload)
    },
    clearToken (state) { // 取消token数组里的请求，并清空数组
        try {
            if (Array.isArray(state.cancelTokenList)) {
                state.cancelTokenList.forEach(item => {
                    if (item.cancelToken) {
                        item.cancelToken('路由跳转取消请求')
                    }
                })
            }
        } catch (err) {
            console.log('clearToken', err)
        }
        state.cancelTokenList = []
    }
}
