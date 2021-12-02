import { computed } from '@vue/composition-api'
import { amendTempTopup, insertTempTopup, deleteTemlataById } from '@/require/template'
import { toast, alert, confirm } from '@/assets/js/vant-helper'

export default ({ type, isSystemTem, tempData, copyTempData }, router) => {
    const navList = computed(() => {
        if (type.value === 'add') {
            return [
                { text: '返回', icon: 'share-o', onClick: goBack },
                { text: '新增', icon: 'pending-payment', type: 'info', onClick: addTemp }
            ]
        } else if (isSystemTem.value) {
            return [
                { text: '返回', icon: 'share-o', onClick: goBack }
            ]
        }
        return [
            { text: '返回', icon: 'share-o', onClick: goBack },
            { text: '保存', icon: 'pending-payment', type: 'info', onClick: saveTemp }
        ]
    })

    // 保存模板入口
    const saveTemp = () => {
        amendTempTopup({ paratem: JSON.stringify(tempData.value) })
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
        insertTempTopup({ paratem: JSON.stringify(tempData.value) })
        .then(res => {
            if (res.code === 200) {
                alert('模板新增成功')
                .then(() => {
                    router.replace({ path: `/chargemanage/charge/${res.tempid}` })
                })
                toast('模板新增成功')
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
            if (['tempname', 'brand', 'telephone'].includes(key)) {
                value = value === null ? '' : value
                tempDataObj[key] = tempDataObj[key] === null ? '' : tempDataObj[key]
                return value.toString() === tempDataObj[key].toString()
            } else if (key === 'tempson') {
                return (value || []).every(({ paymoney, sonname, toAccountMoney }, index) => {
                    const { paymoney: oldPaymoney, sonname: oldSonname, toAccountMoney: oldToAccountMoney } = tempDataObj[key][index]
                    return paymoney.toString() === oldPaymoney.toString() && sonname.toString() === oldSonname.toString() && toAccountMoney.toString() === oldToAccountMoney.toString()
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

    const deleteTemp = () => {
        const tempDataObj = tempData.value
        confirm('确认删除当前模板吗？', '提示', async (action, done) => {
            if (action !== 'confirm') return done()
            try {
                const { code, message } = await deleteTemlataById({ id: tempDataObj.id })
                if (code === 200) {
                    alert('模板删除成功')
                    .then(() => {
                        router.replace('/chargemanage/list')
                    })
                } else {
                    toast(message)
                }
            } catch (error) {
                toast('异常错误')
            } finally {
                done()
            }
        })
    }
    // const preview = () => router.push({ path: '/preview/offline', query: { code, tempid: tempData.value.id } })
    return {
        navList,
        deleteTemp
    }
}
