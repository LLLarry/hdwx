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
