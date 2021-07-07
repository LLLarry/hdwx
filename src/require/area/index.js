import ajax from '../ajax'
/**
 * 获取小区列表
 * @param {*} data { code: String }
 * @returns
 */
export const areaInformationAjax = (data) => {
    return ajax({
        url: '/merchant/areaInformationAjax',
        method: 'post',
        data
    })
}
