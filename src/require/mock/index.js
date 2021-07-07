import ajax from '../ajax'
const baseUrl = 'https://www.fastmock.site/mock/b63d13928440f1a66ecf546480e8a895/mock'
/**
 * 获取ic卡消费记录
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const icConsumeRecord = (data, loadText) => {
    return ajax({
        url: baseUrl + '/icConsumeRecord',
        method: 'get',
        params: data,
        loadText
    })
}

/**
 * 获取小区初始化列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const devicelistAjax = (data, loadText) => {
    return ajax({
        url: baseUrl + '/init/devicelist',
        method: 'get',
        params: data,
        loadText
    })
}
