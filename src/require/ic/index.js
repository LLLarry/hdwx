import ajax from '../ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
/**
 * 获取查询在线卡列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const inquireOnlineData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getOnlineCardInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 更改在线卡状态
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const changeOnlineCardStatus = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/changeOnlineCardStatus',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 商户查询指定在线卡消费记录
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const inquireOnlineCardRecord = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireOnlineCardRecord',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 解除在线卡绑定的用户
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const unbindOnlineCard = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/unbindOnlineCard',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 商户删除在线卡
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const deleteOnlineCard = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteOnlineCard',
        method: 'post',
        data,
        loadText
    })
}
