import { getWechatPublicAccountInfo } from '@/utils/util'
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
  tenantId (state) {
    return state.user.tenantId
  }
}
