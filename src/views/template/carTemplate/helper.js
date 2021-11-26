import initData from './init-data'
import refundStandard from './refund-standard'
import ctemHandler from './ctem-helper'
import contral from './contral'
import navHelper from './nav-helper'
import usingDevice from './using-device'

export default ({ tempid, version, code, router }) => {
    // 获取初始化数据
    const initDataRef = initData({ tempid, version, code })
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
    // switch 和 收费说明控制函数
    const createHintMessage = contral(initDataRef, code)
    // 底部导航部分
    const { navList } = navHelper(initDataRef, router, code)
    const usingDeviceMap = usingDevice(initDataRef, code)
    return {
        ...initDataRef,
        refundShow,
        toggleRefund,
        refundList,
        changeRefundType,
        refundText,
        ...ctemMap,
        createHintMessage,
        navList,
        ...usingDeviceMap
    }
}
