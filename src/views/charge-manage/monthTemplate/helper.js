import initData from './init-data'
import ctemHandler from './ctem-helper'
import navHelper from './nav-helper'
import contral from './contral'

export default ({ router }) => {
    // 获取初始化数据
    const initDataRef = initData()
    // 子模板处理函数
    const ctemMap = ctemHandler(initDataRef)
    // 处理监听事件
    contral(initDataRef)
    // 底部导航部分
    const { navList } = navHelper(initDataRef, router)
    return {
        ...initDataRef,
        ...ctemMap,
        navList
    }
}
