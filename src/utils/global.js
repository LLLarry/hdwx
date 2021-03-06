const { proxy, env: envConfig } = require('../../hdwx.config')
const { production, productionTest } = envConfig
const checkEnvironment = (hostname) => {
    if (production.host.some(item => hostname.includes(item))) {
        return 'production' // 正式环境
    } else if (productionTest.host.some(item => hostname.includes(item))) {
        return 'production-test' // 正式测试环境
    } else {
        return 'development' // 开发环境
    }
}
const env = checkEnvironment(window.location.hostname)
export default (function (global) {
    // eslint-disable-next-line no-proto
    (global.__proto__ || global).HDWX = {
        ENV: env, // 当前环境
        BASE_URL: env === 'production' ? 'http://www.he360.cn' : env === 'production-test' ? 'http://www.tengfuchong.com.cn' : proxy.open ? '' : 'http://localhost', // 请求的基础路径 适用于请求的时候使用的基础路径
        WX_APPID: env === 'production' ? production.wx_appid : env === 'production-test' ? productionTest.wx_appid : proxy.open ? (checkEnvironment(proxy.target) === 'production' ? production.wx_appid : productionTest.wx_appid) : productionTest.wx_appid, // 微信appid
        WECHAT_BROWSER_ENV: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1, // 是否是微信浏览器环境
        PROXY_BASE_URL: env === 'production' ? 'http://www.he360.cn' : env === 'production-test' ? 'http://www.tengfuchong.com.cn' : proxy.open ? proxy.target : 'http://localhost' // 代理请求的基础路径 适用于在本地开启代理模式时，需要使用正式的路径
    }
})(window)
