import Qs from 'qs'
const { proxy } = require('../../hdwx.config')
let { BASE_URL } = HDWX
// eslint-disable-next-line no-unused-expressions
BASE_URL = proxy.open ? proxy.target : BASE_URL
export default function parseURL (url) {
    if (!url.includes(BASE_URL)) {
      return ({
        code: 203,
        message: '地址错误'
      })
    }
    const urlList = url.split('?')
    const baseURL = urlList[0] // 基础路径
    const paramMAP = Qs.parse(urlList[1]) // 参数map
    const checkState = [
        {
          path: '/oauth2pay',
          regexp: /^\d{6}$/,
          key: 'code'
        },
        {
          path: '/oauth2Portpay',
          regexp: /^\d{7,8}$/,
          key: 'codeAndPort'
        },
        {
          path: '/oauth2online',
          regexp: /^[0-9A-F]{8}$/i,
          key: 'cardNumber'
        },
        {
          path: '/oauth2Addrpay',
          regexp: /^[0-9]{8}$/i,
          key: 'addrnum'
        }
    ]
    for (const { path, regexp, key } of checkState) {
      const cURL = BASE_URL + path
      if (baseURL === cURL) {
        const param = paramMAP[key]
        const check = regexp.test(param)
        return {
          status: check ? 200 : 201, // 解析状态码
          [key]: param, // 参数值
          key, // 参数关键字
          message: check ? '解析成功' : '参数解析错误'
        }
      }
    }
    return {
      code: 202,
      message: '路径错误'
    }
}
