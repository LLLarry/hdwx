import ajax from '../ajax'
/**
 * pc端获取系统模板
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const getSystemTempData = (data, loadText) => {
    return ajax({
        url: '/deviceData/getSystemTempData',
        method: 'get',
        data,
        loadText
    })
}

/**
 * 查询模板详情
 * @param {*} data { tempid: 主模板id version：硬件版本号 merid?: 商户id 不传从缓存中获取id }
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceTemlata = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDeviceTemlata',
        method: 'get',
        params,
        loadText
    })
}
