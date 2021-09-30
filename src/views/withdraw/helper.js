import { getType } from '@/utils/util'
import { Dialog, Toast } from 'vant'
import { merBankCardData } from '@/require/withdraw'

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

/**
 * 获取商户银行卡列表
 * @returns
 */
export const getBankList = async () => {
    try {
        const { code, message, bankCardList = [], companyBnkCardList = [] } = await merBankCardData()
        if (code === 200) {
            return Promise.resolve({
                bankCardList: fmtBankCard(bankCardList),
                companyBnkCardList: fmtBankCard(companyBnkCardList)
            })
        } else {
            Toast(message)
            return Promise.reject(message)
        }
    } catch (error) {
        Dialog.alert({
            title: '提示',
            message: '异常错误'
        })
        return Promise.reject(error)
    }
}
