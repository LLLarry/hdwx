import ajax from '../ajax'
/**
 * 获取小区列表
 * @param {*} data { code: String }
 * @returns
 */
export const inquireAreaInfor = (data) => {
    return ajax({
        url: '/mobileMerchant/inquireAreaInfor',
        method: 'post',
        data
    })
}

/**
 * 添加小区
 * @param {*} data { code: String }
 * @returns
 */
 export const insertAreaData = (data) => {
    return ajax({
        url: '/mobileMerchant/insertAreaData',
        method: 'post',
        data
    })
}

/**
 * 通过小区id查询小区详细信息
 * @param {*} data { code: String }
 * @returns
 */
 export const inquireAreaDataById = (data) => {
    return ajax({
        url: '/mobileMerchant/inquireAreaDataById',
        method: 'post',
        data
    })
}

/**
 * 将设备添加入小区
 * @param {*} data { code: String }
 * @returns
 */
 export const addDeviceEnterArea = (data) => {
    return ajax({
        url: '/mobileMerchant/addDeviceEnterArea',
        method: 'post',
        data
    })
}

/**
 * 删除小区中指定的设备
 * @param {*} data { code: String }
 * @returns
 */
 export const deleteAreaDevice = (data) => {
    return ajax({
        url: '/mobileMerchant/deleteAreaDevice',
        method: 'post',
        data
    })
}

/**
 * 删除小区中指定的设备
 * @param {*} data { code: String }
 * @returns
 */
 export const checkAndGetAccount = (data) => {
    return ajax({
        url: '/mobileMerchant/checkAndGetAccount',
        method: 'post',
        data
    })
}

/**
 * 删除小区中指定的设备
 * @param {*} data { code: String }
 * @returns
 */
 export const bindAreaPartner = (data) => {
    return ajax({
        url: '/mobileMerchant/bindAreaPartner',
        method: 'post',
        data
    })
}

/**
 * 修改绑定小区的管理人员分成比例
 * @param {*} data { code: String }
 * @returns
 */
 export const editBindAreaPartner = (data) => {
    return ajax({
        url: '/mobileMerchant/editBindAreaPartner',
        method: 'post',
        data
    })
}

/**
 * 删除（移除）小区合伙人
 * @param {*} data { code: String }
 * @returns
 */
 export const removeAreaPartner = (data) => {
    return ajax({
        url: '/mobileMerchant/removeAreaPartner',
        method: 'post',
        data
    })
}

/**
 * 通过小区id 删除小区信息、并同步删除名下的用户 与设备
 * @param {*} data { code: String }
 * @returns
 */
 export const dealeteAreaInfo = (data) => {
    return ajax({
        url: '/mobileMerchant/dealeteAreaInfo',
        method: 'post',
        data
    })
}

/**
 * 查询小区统计
 * @param {*} data { code: String }
 * @returns
 */
 export const inquireAreaEarnRecord = (data) => {
    return ajax({
        url: '/mobileMerchant/inquireAreaEarnRecord',
        method: 'post',
        data
    })
}
