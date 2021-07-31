const checkEnvironment = () => {
    const hostname = window.location.hostname
    if (['www.he360', '49.233.68.158', '62.234.145.36', '62.234.167.130'].some(item => hostname.includes(item))) {
        return 'production' // 正式环境
    } else if (['www.tengfuchong', '47.93.203.50'].some(item => hostname.includes(item))) {
        return 'production-test' // 正式测试环境
    } else {
        return 'development' // 开发环境
    }
}
const env = checkEnvironment()
export default (function (global) {
    // eslint-disable-next-line no-proto
    global.__proto__.HDWX = {
        ENV: env, // 当前环境
        BASE_URL: env === 'production' ? 'http://www.he360.cn' : env === 'production-test' ? 'http://www.tengfuchong.com.cn' : 'http://localhost', // 请求的基础路径
        WX_APPID: env === 'production' ? 'wx3a3b6ef1ae075731' : env === 'production-test' ? 'wx343168d6b8072668' : 'wx343168d6b8072668', // 微信appid
        WECHAT_BROWSER_ENV: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 // 是否是微信浏览器环境
    }
})(window)
