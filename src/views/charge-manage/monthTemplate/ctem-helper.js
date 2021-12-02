// 子模板处理
import { confirm, toast, alert } from '@/assets/js/vant-helper'
import { insertSonTempMonth, deleteSonTemp } from '@/require/template'

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
                sonname: '30元1月',
                paymoney: 30,
                monthnum: 1
            }
        } else {
            let { paymoney: lastPaymoney, monthnum: lastMonthnum } = tempson[tempson.length - 1]
            lastPaymoney = Number.parseFloat(lastPaymoney)
            lastMonthnum = Number.parseFloat(lastMonthnum)
            const rate = Number.parseFloat((lastPaymoney / lastMonthnum).toFixed(2))
            const monthnum = lastMonthnum + 1
            const paymoney = rate * monthnum
            const sonname = `${paymoney}元${monthnum}月`
            row = {
                paymoney,
                monthnum,
                sonname
            }
        }
        // 编辑子模板的时候
        if (type.value === 'edit') {
            insertSonTempMonth({ ...row, parentid: tempData.value.id })
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
