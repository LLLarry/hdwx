// 初始化数据
import { reactive, toRefs, inject } from '@vue/composition-api'
import { alert } from '@/assets/js/vant-helper'

import { inquireTemplateCharge, inquireDeviceSysTemlata } from '@/require/template'

const initData = reactive({
    tempData: {}, // 模板容器
    copyTempData: {}, // 赋值的模板容器
    isSystemTem: false, // 是否是系统模板
    type: 'add', // 类型
    loading: false, // 是否正在加载中
    errorMsg: '',
    employDeviceinfo: [], // 正在使用当前模板的设备列表
    allDeviceinfo: [] // 所有同类型的设备
})

export default ({ tempid, version, code }) => {
    const root = inject('$root')
    if (typeof tempid !== 'undefined') {
        initData.type = 'edit'
        getTempDataByTempid({ tempid, code, tenantId: root.tenantId })
    } else {
        initData.type = 'add'
        getTempDataByHv({ version, tenantId: root.tenantId })
    }
    return toRefs(initData)
}

/**
 * 通过模板id查询模板信息
 * @param {*} tempid 主模板id
 */
async function getTempDataByTempid (data) {
    try {
        initData.isSystemTem = true
        initData.loading = true
        const { code, message, resultdata, employDeviceinfo, allDeviceinfo } = await inquireTemplateCharge(data)
        if (code === 200) {
            const tempData = {
                ...resultdata,
                walletpay: resultdata.ifwalletpay === 1
            }
            initData.tempData = JSON.parse(JSON.stringify(tempData))
            initData.copyTempData = JSON.parse(JSON.stringify(tempData))
            initData.isSystemTem = tempData.merid === 0
            initData.employDeviceinfo = employDeviceinfo
            initData.allDeviceinfo = allDeviceinfo
        } else {
            alert(message)
            initData.errorMsg = message
        }
    } catch (error) {
        alert('异常错误')
        initData.errorMsg = '异常错误'
    } finally {
        initData.loading = false
    }
}

/**
 * 通过硬件版本号查询系统模板信息
 * @param {*} version 硬件版本号
 */
async function getTempDataByHv (data) {
    try {
        initData.isSystemTem = false
        initData.loading = true
        const { code, message, resultdata } = await inquireDeviceSysTemlata(data)
        if (code === 200) {
            const tempData = {
                ...resultdata,
                walletpay: resultdata.ifwalletpay === 1,
                brand: '',
                tempname: '',
                telephone: ''
            }
            initData.tempData = JSON.parse(JSON.stringify(tempData))
            initData.copyTempData = JSON.parse(JSON.stringify(tempData))
        } else {
            alert(message)
            initData.errorMsg = message
        }
    } catch (error) {
        alert('异常错误')
        initData.errorMsg = '异常错误'
    } finally {
        initData.loading = false
    }
}
