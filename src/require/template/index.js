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

/**
 * 查询主模板通过v3
 * @param {*} data { tempid: 主模板id }
 * @param {*} loadText
 * @returns
 */
 export const inquireTemplateV3 = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireTemplateV3',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 插入子模板v3
 * @param {*} data {  }
 * @param {*} loadText
 * @returns
 */
 export const insertSonTempV3 = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertSonTempV3',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 删除子模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const deleteSonTemp = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteSonTemp',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 修改v3主模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const amendTempV3 = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/amendTempV3',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 添加v3主模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const insertTempV3 = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertTempV3',
        method: 'post',
        data,
        loadText
    })
}
