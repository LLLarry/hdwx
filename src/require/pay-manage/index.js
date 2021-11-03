import ajax from '../ajax'
/**
 * 展示商户名下设备信息
 * @param {*} data {}
 * @returns
 */
export const merDisplayDisbingDevice = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/merDisplayDisbingDevice',
        method: 'post',
        data,
        loadText
    })
}
