import initData from './init-data'
import refundStandard from './refund-standard'
import ctemHandler from './ctem-helper'
import navHelper from './nav-helper'
import usingArea from './using-area'

export default ({ tempid, router }) => {
    // 获取初始化数据
    const initDataRef = initData({ tempid })
    // 退费标准
    const [
        refundShow,
        toggleRefund,
        refundList,
        changeRefundType,
        refundText
    ] = refundStandard(initDataRef)
    // 子模板处理函数
    const ctemMap = ctemHandler(initDataRef)
    // 底部导航部分
    const { navList, deleteTemp } = navHelper(initDataRef, router)
    const usingAreaMap = usingArea(initDataRef)
    return {
        ...initDataRef,
        refundShow,
        toggleRefund,
        refundList,
        changeRefundType,
        refundText,
        ...ctemMap,
        navList,
        ...usingAreaMap,
        deleteTemp
    }
}
