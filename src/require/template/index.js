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
