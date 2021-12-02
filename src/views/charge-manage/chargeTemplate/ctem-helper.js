// 子模板处理
import { confirm, toast, alert } from '@/assets/js/vant-helper'
import { insertSonTempTopup, deleteSonTemp } from '@/require/template'

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
                paymoney: 30,
                toAccountMoney: 30,
                sonname: '30元'
            }
        } else {
            const { paymoney: lastPaymoney, toAccountMoney: lastToAccountMoney } = tempson[tempson.length - 1]
            const rate = Number.parseFloat(((lastToAccountMoney - 0) - (lastPaymoney - 0)).toFixed(2))
            const paymoney = lastPaymoney * 2
            const sendmoney = rate * 2
            const toAccountMoney = paymoney + sendmoney
            console.log(lastToAccountMoney, lastPaymoney)
            row = {
                paymoney,
                toAccountMoney,
                sonname: sendmoney > 0 ? `充${paymoney}送${sendmoney}元` : `${paymoney}元`
            }
        }
        // 编辑子模板的时候
        if (type.value === 'edit') {
            insertSonTempTopup({ ...row, parentid: tempData.value.id })
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
