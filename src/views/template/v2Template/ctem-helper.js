// 子模板处理
import { confirm, toast, alert } from '@/assets/js/vant-helper'
import { insertSonTempCharge, deleteSonTemp } from '@/require/template'

export default ({ tempData, copyTempData, type }) => {
    const deleteChild = ({ id }) => {
        confirm('确认删除当前子模板吗？')
        .then(() => {
            if (type.value === 'edit') {
                deleteSonTemp({ id })
                .then(res => {
                    if (res.code === 200) {
                        toast('子模板删除成功！')
                        tempData.value.tempson = tempData.value.tempson.filter((item) => item.id !== id)
                        copyTempData.value.tempson = copyTempData.value.tempson.filter((item) => item.id !== id)
                    } else {
                        alert(res.message)
                    }
                })
                .catch(() => {
                    toast('异常错误')
                })
            } else {
                tempData.value.tempson = tempData.value.tempson.filter((item) => item.id !== id)
                copyTempData.value.tempson = copyTempData.value.tempson.filter((item) => item.id !== id)
            }
        })
    }
    const addChild = () => {
        const tempson = tempData.value.tempson
        let row
        if (!Array.isArray(tempson) || tempson.length <= 0) {
            row = {
                chargeQuantity: 1,
                chargeTime: 240,
                paymoney: 1,
                sonname: '1元4小时'
            }
        } else {
            const { paymoney: lastPaymoney, chargeTime: lastChargeTime, chargeQuantity: lastChargeQuantity } = tempson[tempson.length - 1]
            const rate1 = Math.round((lastChargeTime / lastPaymoney * 100)) / 100 // 1元钱充多少分钟
            const rate2 = Math.round((lastChargeQuantity / lastPaymoney * 100)) / 100 // 1元钱消耗多少度电
            const paymoney = lastPaymoney + 1
            row = {
                paymoney,
                chargeTime: paymoney * rate1,
                chargeQuantity: paymoney * rate2,
                sonname: `${paymoney}元${Math.round(((paymoney * rate1 / 60) * 100)) / 100}小时`
            }
        }
        // 编辑子模板的时候
        if (type.value === 'edit') {
            insertSonTempCharge({ ...row, parentid: tempData.value.id })
            .then(res => {
                if (res.code === 200) {
                    toast('子模板添加成功！')
                    tempData.value.tempson.push({ ...row, id: res.tempsonid })
                    copyTempData.value.tempson.push({ ...row, id: res.tempsonid })
                } else {
                    alert(res.message)
                }
            })
            .catch(() => {
                toast('异常错误')
            })
        } else {
            tempData.value.tempson.push({ ...row, id: new Date().getTime() })
            copyTempData.value.tempson.push({ ...row, id: new Date().getTime() })
        }
    }
    return {
        deleteChild,
        addChild
    }
}
