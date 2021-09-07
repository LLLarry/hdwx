import ajax from '../ajax'
/**
 * 获取商户每日收益信息
 * @param {*} data {
 * @returns
 */
export const inquireEarningCollectInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireEarningCollectInfo',
        method: 'post',
        data,
        loadText
    })
}
