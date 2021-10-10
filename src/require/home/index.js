import ajax from '../ajax'
/**
 * 获取首页数据
 * @param {*} data { type: Number -> 0或不传 默认直接从redis 中获取数据 1：刷新获取最新数据并存入缓存中以便于下次获取 }
 * @returns
 */
export const getDealHomePageData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/getDealHomePageData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 获取微信sdk加密信息
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
 export const sdkWxGet = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/sdkWxGet',
        method: 'post',
        data,
        loadText
    })
}
