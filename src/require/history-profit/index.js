import ajax from '../ajax'
/**
 * 获取商户每日收益信息
 * @param {*} data {
 * @returns
 */
export const inquireDealidIncomeRecord = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDealidIncomeRecord',
        method: 'post',
        data,
        loadText
    })
}
