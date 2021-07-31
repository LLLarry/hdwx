import ajax from '../ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
/**
 * 获取查询商户设备列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const getDeviceInfoList = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getDeviceInfoList',
        method: 'post',
        data,
        loadText
    })
}
