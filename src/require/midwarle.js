import { deepClone } from '@/utils/util'
import store from '@/store'
import qs from 'qs'
const whiteList = [
    '/mobileMerchant/weChatWithdrawaccess',
    '/mobileMerchant/skipPersonCenter'
]
/**
 * 增加tenantId
 * @param {*} config
 */
export function addTenantId (config) {
    const newConfig = deepClone(config)
    const tenantId = store.getters.tenantId
    if (whiteList.includes(newConfig.url)) {
        if (newConfig.method.toLowerCase() === 'get') {
            const params = newConfig.params || {}
            newConfig.params = {
                ...params,
                tenantId
            }
        } else if (newConfig.method.toLowerCase() === 'post') {
            const data = qs.parse(newConfig.data) || {}
            newConfig.data = qs.stringify({
                ...data,
                tenantId
            })
        }
    }
    return newConfig
}
