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

/** ==============
 * 获取设备系统参数
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const readsysteminfo = (data, loadText) => {
    return ajax({
        url: '/readsysteminfo',
        method: 'post',
        data,
        loadText
    })
}

/** ==============
 * 获取商户下相同类型的设备
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const searchDeviceData = (data, loadText) => {
    return ajax({
        url: '/equipment/searchDeviceData',
        method: 'post',
        data,
        loadText
    })
}

/** ==============
 * 保存系统参数
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const setSysParam = (data, loadText) => {
    return ajax({
        url: '/equipment/setSysParam',
        method: 'post',
        data,
        loadText
    })
}

/** ==============
 * 设备订单数据
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const inquireDeviceOrderData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDeviceOrderData',
        method: 'post',
        data,
        loadText
    })
}

// /** ==============
//  * 查询端口状态
//  * @param {*} data
//  * @param {*} loadText
//  * @returns
//  */
//  export const querystate = (data, loadText) => {
//     return ajax({
//         url: '/querystate',
//         method: 'post',
//         data,
//         loadText
//     })
// }
