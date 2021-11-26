import { computed } from '@vue/composition-api'
import { amendTemplateCard, insertTemplateCard } from '@/require/template'
import { toast, alert } from '@/assets/js/vant-helper'

export default ({ type, isSystemTem, tempData, copyTempData }, router, code) => {
    const navList = computed(() => {
        if (type.value === 'add') {
            return [
                { text: '返回', icon: 'share-o', onClick: goBack },
                { text: '新增', icon: 'pending-payment', type: 'info', onClick: addTemp }
            ]
        } else if (isSystemTem.value) {
            return [
                { text: '返回', icon: 'share-o', onClick: goBack },
                { text: '预览', icon: 'eye-o', onClick: preview }
            ]
        }
        return [
            { text: '返回', icon: 'share-o', onClick: goBack },
            { text: '预览', icon: 'eye-o', onClick: preview },
            { text: '保存', icon: 'pending-payment', type: 'info', onClick: saveTemp }
        ]
    })

    // 保存模板入口
    const saveTemp = () => {
        amendTemplateCard({ paratem: JSON.stringify(tempData.value) })
        .then(res => {
            if (res.code === 200) {
                alert('模板保存成功')
                .then(() => {
                    copyTempData.value = JSON.parse(JSON.stringify(tempData.value))
                })
            } else {
                toast(res.message)
            }
        })
        .catch(() => {
            toast('异常错误')
        })
    }

    // 新增模板入口
    const addTemp = () => {
        insertTemplateCard({ paratem: JSON.stringify(tempData.value) })
        .then(res => {
            if (res.code === 200) {
                alert('模板新增成功')
                .then(() => {
                    router.replace({ path: `/template/car/${res.tempid}`, query: { code } })
                })
            } else {
                toast(res.message)
            }
        })
        .catch(() => {
            toast('异常错误')
        })
    }

    // 后退一步
    const goBack = () => {
        const tempDataObj = tempData.value
        const copyTempDataObj = copyTempData.value
        if (type.value === 'add') {
            return router && router.go(-1)
        }
        // 校验数据是否发生了改变
        const result = Object.entries(copyTempDataObj).every(([key, value]) => {
            if (['tempname', 'brand', 'telephone', 'elecnorm', 'ifalipay'].includes(key)) {
                value = value === null ? '' : value
                tempDataObj[key] = tempDataObj[key] === null ? '' : tempDataObj[key]
                return value.toString() === tempDataObj[key].toString()
            } else if (key === 'tempson') {
                return (value || []).every(({ paymoney, sonname, chargeQuantity }, index) => {
                    const { paymoney: oldPaymoney, sonname: oldSonname, chargeQuantity: oldChargeQuantity } = tempDataObj[key][index]
                    return paymoney.toString() === oldPaymoney.toString() && sonname.toString() === oldSonname.toString() && chargeQuantity.toString() === oldChargeQuantity.toString()
                })
            }
            return true
        })
        if (!result) {
           alert('请先点击右下角保存按钮')
        } else {
            router && router.go(-1)
        }
    }

    const preview = () => router.push({ path: '/preview/v2', query: { code, tempid: tempData.value.id } })
    return {
        navList
    }
}
