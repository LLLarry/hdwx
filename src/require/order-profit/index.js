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
