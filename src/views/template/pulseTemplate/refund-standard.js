// 退费标准
import { computed, ref } from '@vue/composition-api'

export default (initDataRef) => {
    // 退费标准是否展示
    const refundShow = ref(false)

    // 切换退费标准
    const toggleRefund = () => {
        refundShow.value = !refundShow.value
    }
    // 退费标准actions
    const refundList = computed(() => {
        const morm = initDataRef.tempData.value.morm
        return [
            { id: 1, name: '按时间电量最小', subname: '时间/电量用完会自动停止', color: morm === 1 ? '#07c160' : undefined },
            { id: 2, name: '时间最小', subname: '时间用完会自动停止', color: morm === 2 ? '#07c160' : undefined },
            { id: 3, name: '电量最小', subname: '电量用完会自动停止', color: morm === 3 ? '#07c160' : undefined }
          ]
    })

    // 更换退费类型
    const changeRefundType = ({ id }) => {
        initDataRef.tempData.value.morm = id
    }

    // 退费标准对应文字
    const refundText = computed(() => {
        const morm = initDataRef.tempData.value.morm
        return morm === 1 ? '按时间电量最小' : morm === 2 ? '时间最小' : morm === 3 ? '电量最小' : '未知'
    })
    return [
        refundShow,
        toggleRefund,
        refundList,
        changeRefundType,
        refundText
    ]
}
