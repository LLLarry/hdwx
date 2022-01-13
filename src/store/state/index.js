// 初始化state
// 关于 auth说明：
/**
 * 超级管理员 0
 * 普通用户 1
 * 普通商户 2
 * 代理商，进入自己的账户传2
 *        进入明下商户账户传3
 * 子账号 财务子账号传7
 *        维修子账号传6
 */
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
