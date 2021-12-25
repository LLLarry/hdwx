// 初始化state
export const initState = {
    user: {},
    global: {
        clientWidth: 375, // 全局屏幕宽度
        clientHeight: 812, // 全局屏幕高
        theme: 'dark' // 主题色
    },
    cancelTokenList: [] // 取消接口list
}
// 从缓存中获取state信息
const storageState = JSON.parse(sessionStorage.getItem('__hdwx_state__'))
const state = storageState || initState
export default {
    ...state
}
