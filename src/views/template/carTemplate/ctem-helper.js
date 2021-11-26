// 子模板处理
import { confirm, toast, alert } from '@/assets/js/vant-helper'
import { insertSonTempCard, deleteSonTemp } from '@/require/template'

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
        // 每度电收费
        let elecnorm = Number.parseFloat(tempData.value.elecnorm)
        elecnorm = (Number.isNaN(elecnorm) || elecnorm <= 0) ? 1 : elecnorm
        const tempson = tempData.value.tempson
        // 每元钱充多少度电
        const rate = Number.parseFloat((1 / elecnorm).toFixed(2))
        let row
        if (!Array.isArray(tempson) || tempson.length <= 0) {
            const chargeQuantity = Number.parseFloat((5 * rate).toFixed(2))
            row = {
                chargeQuantity,
                paymoney: 5,
                sonname: `5元${chargeQuantity}度电`
            }
        } else {
            const { paymoney: lastPaymoney } = tempson[tempson.length - 1]
            const paymoney = lastPaymoney + 5
            const chargeQuantity = Number.parseFloat((paymoney * rate).toFixed(2))
            row = {
                paymoney,
                chargeQuantity,
                sonname: `${paymoney}元${chargeQuantity}度电`
            }
        }
        // 编辑子模板的时候
        if (type.value === 'edit') {
            insertSonTempCard({ ...row, parentid: tempData.value.id })
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
