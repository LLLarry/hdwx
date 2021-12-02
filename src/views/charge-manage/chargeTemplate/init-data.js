// 初始化数据
import { reactive, toRefs } from '@vue/composition-api'
import { alert } from '@/assets/js/vant-helper'

import { inquireTemplateTopUp, inquireDeviceSysTemlata } from '@/require/template'

const initData = reactive({
    tempData: {}, // 模板容器
    copyTempData: {}, // 赋值的模板容器
    isSystemTem: false, // 是否是系统模板
    type: 'add', // 类型
    loading: false, // 是否正在加载中
    errorMsg: '',
    resultwallet: [], // 钱包 正在使用当前模板的小区列表
    resultonline: [] // 在线卡 正在使用当前模板的小区列表
})

export default ({ tempid }) => {
    if (typeof tempid !== 'undefined') {
        initData.type = 'edit'
        getTempDataByTempid({ tempid })
    } else {
        initData.type = 'add'
        getTempDataByHv({ version: '充值' })
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
        const { code, message, resultdata, resultwallet, resultonline } = await inquireTemplateTopUp(data)
        if (code === 200) {
            const tempData = {
                ...resultdata
            }
            initData.tempData = JSON.parse(JSON.stringify(tempData))
            initData.copyTempData = JSON.parse(JSON.stringify(tempData))
            initData.isSystemTem = tempData.merid === 0
            initData.resultwallet = resultwallet
            initData.resultonline = resultonline
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
