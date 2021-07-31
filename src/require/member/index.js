import ajax from '../ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
/**
 * 获取会员列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const ajaxMemberCentre = (data, loadText) => {
    return ajax({
        url: '/merchant/ajaxMemberCentre',
        method: 'post',
        data,
        loadText
    })
}

// 获取模拟v3模板数据
export const getV3TempData = (data, loadText) => {
    return ajax({
        url: '/deviceData/inquireDeviceDetail?code=002283&isolate=1',
        method: 'get',
        data,
        loadText
    })
}

/**
 * 获取会员列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const getMemberInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getMemberInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 更改会员所属小区
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const changeMemberAreaInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/changeMemberAreaInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 查询会员/IC卡管理信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const skipVirtualTopupPage = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/skipVirtualTopupPage',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 会员/IC卡虚拟充值
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const virtualPayMoney = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/virtualPayMoney',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 查询商户名下指定会员钱包的消费记录
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const inquireMemberRecord = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireMemberRecord',
        method: 'post',
        data,
        loadText
    })
}
