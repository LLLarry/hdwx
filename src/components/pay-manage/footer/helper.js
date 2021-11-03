import { computed, inject, ref } from '@vue/composition-api'

export const useSelectList = () => {
    const selectList = inject('selectList')
    return selectList
}

// 选择的设备信息
export const useSelectListMap = (selectListRef) => {
    // 获取设备列表
    const initList = inject('initList')
    return computed(() => {
        // 选择的设备号list
        const selectList = selectListRef.value
        // 过滤选择的设备信息
        const fmtterSelectList = initList.value.filter(({ code }) => selectList.includes(code))
        // 商户需要支付的总金额
        const totalMoney = fmtterSelectList.reduce((acc, item) => {
            acc += item.money
            return acc
        }, 0)
        // 选择的设备转化为字符串
        const selectListString = selectList.join(',')
        return {
            isSelect: !!selectList.length, // 是否选择了设备
            count: selectList.length, // 选择的数量
            money: totalMoney, // 商户需要支付的总金额
            selectDevices: selectListString // 选择的设备转化为字符串
        }
    })
}

// 切換是是否显示选中信息
export const useToggleSelectInfo = () => {
    const showSelectInfo = ref(false)
    return showSelectInfo
}
