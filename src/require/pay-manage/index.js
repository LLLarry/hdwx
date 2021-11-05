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

/**
 * 展示商户名下指定小区下的设备信息
 * @param {*} data {areaId: Number}
 * @returns
 */
 export const merDisplayAreaDeviceData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/merDisplayAreaDeviceData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取微信加密信息
 * @param {*} data {areaId: Number}
 * @returns
 */
 export const merWxPayment = (data, loadText) => {
    return ajax({
        url: '/wxpay/merWxPayment',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 钱包支付缴费
 * @param {*} data {areaId: Number}
 * @returns
 */
 export const merPayment = (data, loadText) => {
    return ajax({
        url: '/merchant/merPayment',
        method: 'post',
        data,
        loadText
    })
}
