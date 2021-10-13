import ajax from '../ajax'
/**
 * 获取首页数据
 * @param {*} data { type: Number -> 0或不传 默认直接从redis 中获取数据 1：刷新获取最新数据并存入缓存中以便于下次获取 }
 * @returns
 */
export const getDealHomePageData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getDealHomePageData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取微信sdk加密信息
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
 export const sdkWxGet = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/sdkWxGet',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 商户绑定设备
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
 export const bindingDevice = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/bindingDevice',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  微信退费
 * @param {*} data
 * @returns
 */
 export const doRefund = (data, loadText) => {
    return ajax({
        url: '/wxpay/doRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  支付宝退费
 * @param {*} data
 * @returns
 */
 export const alipayRefund = (data, loadText) => {
    return ajax({
        url: '/alipay/alipayRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  钱包退费
 * @param {*} data
 * @returns
 */
 export const doWalletReturn = (data, loadText) => {
    return ajax({
        url: '/wxpay/doWalletReturn',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  虚拟充值退费
 * @param {*} data
 * @returns
 */
 export const mercVirtualReturn = (data, loadText) => {
    return ajax({
        url: '/wxpay/mercVirtualReturn',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  微信小程序退费
 * @param {*} data
 * @returns
 */
 export const wxDoRefund = (data, loadText) => {
    return ajax({
        url: '/wxpay/wxDoRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  支付宝小程序退费
 * @param {*} data
 * @returns
 */
 export const aliDoRefund = (data, loadText) => {
    return ajax({
        url: '/alipay/aliDoRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 *  银联退费
 * @param {*} data
 * @returns
 */
 export const unionpaydoRefund = (data, loadText) => {
    return ajax({
        url: '/unionpay/doRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 撤回
 * @param {*} data
 * @returns
 */
 export const withdrawWalletRefund = (data, loadText) => {
    return ajax({
        url: '/wxpay/withdrawWalletRefund',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取退款id
 * @param {*} data
 * @returns
 */
 export const verifyorder = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/verifyTradeOrderStatus',
        method: 'post',
        data,
        loadText
    })
}
