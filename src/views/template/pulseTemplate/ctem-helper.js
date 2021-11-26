// 子模板处理
import { confirm, toast, alert } from '@/assets/js/vant-helper'
import { insertSonTempIncoins, deleteSonTemp } from '@/require/template'

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
                incoinsnum: 1,
                paymoney: 1,
                sonname: '1元1个币'
            }
        } else {
            const { paymoney: lastPaymoney, incoinsnum: lastIncoinsnum } = tempson[tempson.length - 1]
            const rate = Math.round((lastIncoinsnum / lastPaymoney * 100)) / 100 // 1元钱几个币
            const paymoney = lastPaymoney + 1
            row = {
                paymoney,
                incoinsnum: rate * paymoney,
                sonname: `${paymoney}元${rate * paymoney}个币`
            }
        }
        // 编辑子模板的时候
        if (type.value === 'edit') {
            insertSonTempIncoins({ ...row, parentid: tempData.value.id })
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
