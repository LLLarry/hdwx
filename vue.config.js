module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/wx' : '/',
    configureWebpack: {
        entry: {
            initWecharFont: './src/assets/js/initWechatFont.js'
        }
    },
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://www.he360.cn', // 目标地址
                target: 'http://www.tengfuchong.com.cn', // 目标地址
                ws: true, // 是否启用websockets
                changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { '^/api': '/' } // 这里重写路径
            }

        }
    }
}
