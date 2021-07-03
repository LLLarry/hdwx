import ajax from '../ajax'

/**
 * 获取会员列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const ajaxMemberCentre = (data, loadText) => {
    return ajax({
        url: '/api/merchant/ajaxMemberCentre',
        method: 'post',
        data,
        loadText
    })
}
