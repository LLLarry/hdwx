import ajax from '../ajax'

/**
 * 获取查询在线卡列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const inquireOnlineData = (data, loadText) => {
    return ajax({
        url: '/api/merchant/inquireOnlineData',
        method: 'post',
        data,
        loadText
    })
}
