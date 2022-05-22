// 初始化数据
import { reactive, toRefs } from '@vue/composition-api'
import { alert } from '@/assets/js/vant-helper'

import { inquireMerTemplateMonth } from '@/require/template'

const initData = reactive({
    tempData: {}, // 模板容器
    copyTempData: {}, // 复制的模板容器
    isSystemTem: false, // 是否是系统模板
    type: 'edit', // 类型
    loading: false, // 是否正在加载中
    errorMsg: ''
})

export default (tenantId) => {
    getTempData(tenantId)
    return toRefs(initData)
}

/**
 * 模板信息
 * @param {*} tenantId
 */
async function getTempData (tenantId) {
    try {
        initData.isSystemTem = false
        initData.loading = true
        const { code, message, resultdata } = await inquireMerTemplateMonth({
            tenantId
        })
        if (code === 200) {
            const tempData = {
                ...resultdata,
                month: resultdata.ifmonth === 1
            }
            initData.tempData = JSON.parse(JSON.stringify(tempData))
            initData.copyTempData = JSON.parse(JSON.stringify(tempData))
        } else {
            alert(message)
            initData.errorMsg = message
        }
    } catch (error) {
        console.log(error)
        alert('异常错误')
        initData.errorMsg = '异常错误'
    } finally {
        initData.loading = false
    }
}
