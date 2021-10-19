import { getType } from '@/utils/util'
import { Dialog, Toast } from 'vant'
import { merBankCardData } from '@/require/withdraw'
import router from '@/router'

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

/**
 * 检验并且跳转
 * @param {*} type
 */
export const checkAndGo = async (type) => {
    try {
        const obj = {}
        const { bankCardList = [], companyBnkCardList = [] } = await getBankList()
        obj.bankCardList = bankCardList
        obj.companyBnkCardList = companyBnkCardList
        const one = obj[type === 1 ? 'bankCardList' : 'companyBnkCardList'][0]
        if (one) {
            router.push({ path: `/withdraw/page/${type}`, query: { id: one.id } })
        } else {
            Dialog.alert({
                title: '提示',
                message: type === 1 ? '对不起，您暂时未添加银行卡，请先添加银行卡！' : '对不起，您暂时未添加对公账户，请先添加对公账户！'
            })
        }
    } catch (error) {
        console.log(error)
        Toast(error)
    }
}
