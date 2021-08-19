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
