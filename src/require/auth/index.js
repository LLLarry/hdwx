import ajax from '../ajax'
/**
 * 发送微信返回的Code交给后台验证
 * @param {*} data { code: String }
 * @returns
 */
export const sendCodeAndgetUserInfo = (data) => {
    return ajax({
        url: '/mobileMerchant/getDealAccountInfo',
        method: 'post',
        data
    })
}

/**
 * 发送cookie交给后台验证,当前cookie是否失效
 * @param
 * @returns
 */
 export const getDealAccountData = (data) => {
    return ajax({
        url: '/mobileMerchant/getDealAccountData',
        method: 'post',
        data
    })
}

export const getAjaxEquList = (data, loadText) => {
    return ajax({
        url: '/equipment/getAjaxEquList',
        method: 'post',
        data,
        loadText
    })
}
