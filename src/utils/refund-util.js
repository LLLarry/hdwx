
import { Dialog } from 'vant'
import { doRefund, alipayRefund, doWalletReturn, mercVirtualReturn, wxDoRefund, aliDoRefund, unionpaydoRefund, withdrawWalletRefund } from '@/require/home'

const map = {
    1: doRefund, // 微信退费
    2: alipayRefund, // 支付宝退费
    3: doWalletReturn, // 钱包退费
    4: mercVirtualReturn, // 虚拟充值退费
    5: wxDoRefund, // 微信小程序退费
    6: aliDoRefund, // 支付宝小程序退费
    7: unionpaydoRefund // 银联退费
}

/**
 * 退款操作
 * @param {*} type 退款类型
 * @param {*} data 传递的参数
 */
export const refundUtil = (type, data) => {
    return new Promise((resolve, reject) => {
        map[type]({
            ...data,
            utype: 2 // 不需要输入密码
        })
        .then(res => {
            if (res.ok === 'error') {
                reject(new Error('退款失败'))
            } else if (res.ok === 'usererror') {
                reject(new Error('用户金额不足'))
            } else if (res.ok === 'moneyerror') {
                reject(new Error('商户或合伙人金额不足'))
            } else if (res.ok === 'ok') {
                resolve('退款成功')
            } else {
                reject(new Error('操作错误'))
            }
        })
        .catch(error => {
            reject(error)
        })
    })
}

/**
 * 撤回功能
 * @param {*} data
 * @returns
 */
export const recall = (data) => {
    return new Promise((resolve, reject) => {
        withdrawWalletRefund(data)
        .then(res => {
            Dialog.alert({
                title: '提示',
                message: res.messg
            })
            .then(() => {
                resolve()
            })
        })
        .catch(() => {
            reject(new Error('异常错误'))
        })
    })
}
