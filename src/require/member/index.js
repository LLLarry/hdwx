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
