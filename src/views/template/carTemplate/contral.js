import { watch } from '@vue/composition-api'
import { editTemplateHintInfo } from '@/require/template'
import { toast, confirm } from '@/assets/js/vant-helper'

// 控制层 switch 生成收费说明
export default ({ tempData }, code) => {
    // 监听 permit walletpay alipay
    watch([
        () => tempData.value.permit,
        () => tempData.value.walletpay,
        () => tempData.value.alipay
    ], ([permit, walletpay, alipay]) => {
        tempData.value.ifpermit = permit ? 1 : 2
        tempData.value.ifwalletpay = walletpay ? 1 : 2
        tempData.value.ifalipay = alipay ? 1 : 2
    })

    // 监听elecnorm改变，实时生成收费说明， 初次渲染改变不做处理
    watch(() => tempData.value.elecnorm, (elecnorm, oldElecnorm) => {
        if (!oldElecnorm) return
        elecnorm = Number.parseFloat(elecnorm)
        elecnorm = Number.isNaN(elecnorm) ? -1 : elecnorm
        let hintMessage
        if (elecnorm <= 0) {
            hintMessage = ''
        } else {
            hintMessage = `本设备收费标准为： ${elecnorm}元 / 度电`
        }
        tempData.value.hintMessage = hintMessage
    })
   const loadHintMessage = (type) => {
     if (type === 1) {
        tempData.value.hintMessage = '选择的充电时间为小功率电动车充电时间，仅供参考。\n大功率电动车充电时间智能动态计算，以实际为准。'
     } else {
        editTemplateHintInfo({
            code,
            tempid: tempData.value.id
        })
        .then(res => {
            if (res.code === 200) {
                tempData.value.hintMessage = res.resultinfo
            } else {
                toast(res.message)
            }
        })
        .catch(() => {
            toast('异常错误')
        })
     }
   }

   const createHintMessage = (type) => {
        confirm(type === 1 ? '确认使用默认说明吗？' : '确认使用自动说明吗？')
        .then(() => {
            loadHintMessage(type)
        })
   }
   return createHintMessage
}
