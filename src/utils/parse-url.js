import Qs from 'qs'
let { PROXY_BASE_URL } = HDWX

export default function parseURL (url) {
    console.log('url', url)
    console.log('PROXY_BASE_URL', PROXY_BASE_URL)
    if (PROXY_BASE_URL.includes('http://www.he360')) {
      PROXY_BASE_URL = ['http://www.he360.cn', 'http://www.he360.com.cn', 'https://www.tengfuchong.cn/applet/']
    }
    console.log('PROXY_BASE_URL2', PROXY_BASE_URL)
    if (Array.isArray(PROXY_BASE_URL)) { // 正式环境
        // 判断蓝牙设备
        if (url.includes(PROXY_BASE_URL[2])) {
          const code = url.replace(PROXY_BASE_URL[2], '')
          if (/^\d{6,8}$/.test(code)) {
            return {
              status: 200, // 解析状态码
              code: code.substr(0, 6), // 参数值
              key: 'code', // 参数关键字
              message: '解析成功'
            }
          } else {
            return {
              status: 205, // 解析状态码
              message: '解析错误'
            }
          }
        }
        if (!url.includes(PROXY_BASE_URL[0]) && !url.includes(PROXY_BASE_URL[1])) {
            return ({
                code: 204,
                message: '路径错误1'
            })
        }
    } else {
        if (!url.includes(PROXY_BASE_URL)) {
            return ({
                code: 204,
                message: '地址错误2'
            })
        }
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
      let cURL1
      let cURL2
      if (Array.isArray(PROXY_BASE_URL)) { // 正式环境
        cURL1 = PROXY_BASE_URL[0] + path
        cURL2 = PROXY_BASE_URL[1] + path
      } else {
        cURL1 = PROXY_BASE_URL + path
      }
      if (baseURL === cURL1 || (baseURL === cURL2 && !!cURL2)) {
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
