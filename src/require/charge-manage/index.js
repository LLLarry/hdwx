import ajax from '../ajax'
/**
 * 小区区充值模板信息预览
 * @param {*} data { }
 * @returns
 */
export const areaTopUpTemplatePreview = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/areaTopUpTemplatePreview',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取未使用该模板的小区信息
 * @param {*} data { tempid 模板id,  type 1:钱包  2:在线卡 }
 * @returns
 */
 export const getUnusedAreaInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getUnusedAreaInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 更新小区（多个）的充值模板信息
 * @param {*} data { tempid 模板id,  type 1:钱包  2:在线卡, list: 小区id的集合}
 * @returns
 */
 export const updateAreaTopUp = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/updateAreaTopUp',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 移除充值模板中的小区
 * @param {*} data { aid 小区id,  type 1:钱包  2:在线卡, list: 小区id的集合}
 * @returns
 */
 export const deleteEmployTopupTempArea = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteEmployTopupTempArea',
        method: 'post',
        data,
        loadText
    })
}
