import ajax from '../ajax'
/**
 * 获取商户个人中心数据
 * @param {*} data {
 * @returns
 */
export const skipPersonCenter = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/skipPersonCenter',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取商户手机号 / 服务电话
 * @param {*} data {
 * @returns
 */
 export const mobileMerchant = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/mobileMerchant',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取商户余额明细
 * @param {*} data {
 * @returns
 */
 export const inquireMerEarningsDetail = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireMerEarningsDetail',
        method: 'post',
        data,
        loadText
    })
}
