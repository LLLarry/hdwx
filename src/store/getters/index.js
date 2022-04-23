import { getWechatPublicAccountInfo } from '@/utils/util'
import state from '../state'
export default {
  /**
   * 获取对应公众号的名称
   * @param {*} state
   * @returns String 公众号名称
   */
  getWPN(state) {
    const platform = state.user.platform
    return (
      getWechatPublicAccountInfo(platform) || getWechatPublicAccountInfo.DEFAULT
    ).name
  },
  // 工厂id
  tenantId (state) {
    return state.user.tenantId
  },
  // 是否显示微信退费
  isShowWechatRefud () {
    return state.user.firm !== 1
  },
  // 是否显示个人银行卡退费
  isShowPersonalBankRefud () {
    return state.user.firm !== 1
  }
}
