import { getType } from '@/utils/util'

/**
 * 格式化银行卡号的辅助函数
 * @param {*} list 银行卡列表
 * @returns 格式化之后的银行卡列表
 */
export const fmtBankCard = (list = []) => {
    if (!Array.isArray(list)) throw new TypeError('list is not array')
    return list.map(item => {
        if (getType(item.bankcardnum) === 'string') {
            item.bankcardnum = '**** '.repeat(3) + item.bankcardnum
        }
        return item
    })
}
