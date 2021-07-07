import ajax from '../ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
/**
 * 获取查询在线卡列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const inquireOnlineData = (data, loadText) => {
    return ajax({
        url: '/merchant/inquireOnlineData',
        method: 'post',
        data,
        loadText
    })
}
