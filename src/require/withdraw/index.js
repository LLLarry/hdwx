import ajax from '../ajax'
/**
 * 获取用户银行卡和对公账户
 * @param {*} data {
 * @returns
 */
export const merBankCardData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/merBankCardData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 通过id查询银行航卡信息
 * @param {*} data { id: 银行卡id }
 * @returns
 */
 export const inquireBankCardInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireBankCardInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 编辑银行卡
 * @param {*} data
 * @returns
 */
 export const editBankCardInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/editBankCardInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 添加银行卡
 * @param {*} data
 * @returns
 */
 export const addBankCardInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/addBankCardInfo',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 通过id删除银行卡
 * @param {*} data
 * @returns
 */
 export const deleteUserBankcardByid = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteUserBankcardByid',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 提现记录查询
 * @param {*} data
 * @returns
 */
 export const merWithdrawRecord = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/merWithdrawRecord',
        method: 'post',
        data,
        loadText
    })
}
