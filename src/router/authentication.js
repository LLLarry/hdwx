import store from '../store'
import { getType } from '@/utils/util'
const { BASE_URL, WX_APPID } = HDWX
export default (router) => {
    router.beforeEach((to, from, next) => {
        console.log(to)
        if (['/auth'].includes(to.path)) {
            next()
        } else if (getType(store.state.user.id) === 'undefined') {
            // next()
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(`${BASE_URL}/wx/auth`)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        } else {
            next()
        }
    })
}
