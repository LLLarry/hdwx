import store from '../store'
import { getType } from '@/utils/util'
const { BASE_URL, WX_APPID, WECHAT_BROWSER_ENV, ENV } = HDWX
console.log('WECHAT_BROWSER_ENV', WECHAT_BROWSER_ENV)
export default (router) => {
    router.beforeEach(async (to, from, next) => {
        store.commit('clearToken')
        if (['/auth', '/register', '/login'].includes(to.path)) {
            next()
        } else if (getType(store.state.user.id) === 'undefined') {
            // if (WECHAT_BROWSER_ENV && ENV !== 'development') {
            //     window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(`${BASE_URL}/merwx/auth`)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
            // } else {
            //     const result = await store.dispatch('verifyCookieIsExpire')
            //     if (result === 200) {
            //         next()
            //     } else {
            //         next('/register')
            //     }
            // }

            // 判断地址栏中是否存在tenantId（租户表示）,存在则拿过来作为参数向后台请求
            // const tenantId = getURLParams().tenantId
            const tenantId = window.sessionStorage.getItem('__init_tenantId__') || undefined
            const result = await store.dispatch('verifyCookieIsExpire', { merid: to.query.merid, tenantId })
            if (result === 200) {
                next()
            } else {
                if (WECHAT_BROWSER_ENV && ENV !== 'development') {
                    window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(`${BASE_URL}/merwx/auth`)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
                } else {
                    next('/register')
                }
            }
        } else {
            next()
        }
    })
}
