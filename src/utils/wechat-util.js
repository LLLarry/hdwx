// 微信工具
import { sdkWxGet } from '@/require/home'

// 获取微信加密信息
const wxConfig = async (pageUrl, jsApiList) => {
    const { appId, nonceStr, signature, timestamp: timestampStr } = await sdkWxGet({ pageUrl })
    const timestamp = Number(timestampStr)
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList // 必填，需要使用的JS接口列表
    })
}

const wxReady = () => {
    return new Promise((resolve, reject) => {
        wx.ready(() => {
            resolve()
        })
        wx.error((res) => {
            reject(res)
        })
    })
}

/**
 * 调取微信扫一扫
 * @param {*} pageUrl 地址url
 * @returns Promise
 */
export const scanQRCode = async (pageUrl) => {
        await wxConfig(pageUrl, ['scanQRCode'])
        wxReady()
        .then(() => {
            wx.scanQRCode({
                needResult: 0,
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: ({ resultStr }) => {
                    return Promise.resolve(resultStr)
                }
            })
        })
        .catch(e => {
            return Promise.reject(e)
        })
}
