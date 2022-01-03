import ajax from '../ajax'
/**
 * 获取商户个人中心数据
 * @param {*} data {
 * @returns
 */
export const skipPersonCenter = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/skipPersonCenter',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取商户手机号 / 服务电话
 * @param {*} data {
 * @returns
 */
 export const mobileMerchant = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/mobileMerchant',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取商户余额明细
 * @param {*} data {
 * @returns
 */
 export const inquireMerEarningsDetail = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireMerEarningsDetail',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 更改商户手机号信息
 * @param {*} data {type 1: 服务电话修改  2：电话修改, uid： 用户id,  phone： 修改后的电话}
 * @returns
 */
 export const updateAccountPhoneById = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/updateAccountPhoneById',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 指定商户某个消息权限开关 1
 * @param {*} data {
 * @returns
 */
 export const settingAuthoritySwitch = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/settingAuthoritySwitch',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 生成子账号邀请码
 * @param {*} data {
 * @returns
 */
 export const createCaptcha = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/createCaptcha',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 查询子账号
 * @param {*} data {
 * @returns
 */
 export const inquireMerChildUser = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireMerChildUser',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 子账户切换
 * @param {*} data {
 * @returns
 */
 export const switchoverChildUser = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/switchoverChildUser',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 删除子账户
 * @param {*} data {
 * @returns
 */
 export const deleteChildUser = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteChildUser',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 设置商户的真实姓名
 * @param {*} data {
 * @returns
 */
 export const updateAccountData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/updateAccountData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 商户收益明细详情
 * @param {*} data {
 * @returns
 */
 export const inquireMerEarnDetailInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireMerEarnDetailInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 通过会员号/手机号，筛选用户是否可以成为子账号
 * @param {*} data {
 * @returns
 */
 export const inquireAccountForChild = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireAccountForChild',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 添加子账号
 * @param {*} data {
 * @returns
 */
 export const insertChildAccount = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertChildAccount',
        method: 'post',
        data,
        loadText
    })
}
