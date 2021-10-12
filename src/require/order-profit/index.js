import ajax from '../ajax'
/**
 * 订单统计查询
 * @param {*} data {
 * @returns
 */
export const inquireTraOrderData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireTraOrderData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 订单功率曲线数据图像
 * @param {*} data {
 * @returns
 */
 export const powerdrawing = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/powerdrawing',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 订单功率曲线数据
 * @param {*} data {
 * @returns
 */
 export const powerbrokenline = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/powerbrokenline',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 订单明细
 * @param {*} data {
 * @returns
 */
 export const orderinquiredetails = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/orderinquiredetails',
        method: 'post',
        data,
        loadText
    })
}
