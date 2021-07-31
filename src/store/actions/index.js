// actions
import { getDealAccountData } from '@/require/auth'
export default {
    async verifyCookieIsExpire ({ commit }) {
        const { code, dealuser, openid } = await getDealAccountData()
        if (code === 200) {
            commit('setUser', { ...dealuser, openid })
        }
        return code
    }
}
