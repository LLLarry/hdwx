// actions
import { getDealAccountData } from '@/require/auth'
export default {
    async verifyCookieIsExpire ({ commit }, data) {
        const { code, dealuser, openid, agent, showincoins } = await getDealAccountData(data)
        if (code === 200) {
            commit('setUser', { ...dealuser, openid, agent, showincoins })
        }
        return code
    }
}
