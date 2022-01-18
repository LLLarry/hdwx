// actions
import { getDealAccountData } from '@/require/auth'
import accessRecord from '@/assets/js/access-record'
export default {
  async verifyCookieIsExpire({ commit }, data) {
    const {
      code,
      dealuser,
      openid,
      agent,
      showincoins,
      platform,
      auth
    } = await getDealAccountData(data)
    if (code === 200) {
      commit('setUser', {
        ...dealuser,
        openid,
        agent,
        showincoins,
        platform,
        auth
      })
      // 记录商户的访问记录
      accessRecord()
    }
    return code
  }
}
