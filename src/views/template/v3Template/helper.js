/**
 * 新增子模板处理函数
 * @param {*} from 新增那个子模板
 * @param {*} gather 子模板列表
 */
export function addChildTemHelper (from) {
    const gather = this.tempData[from]
    const lastItem = gather[gather.length - 1]
    let data = {}
    //  收费标准 （按功率计费）
    if (from === 'tempower') {
        if (typeof lastItem === 'undefined') {
            data = { paymoney: 0.25, startpower: 0, stoppower: 200, id: new Date().getTime() }
        }
        let { paymoney, startpower, stoppower } = lastItem
        paymoney = Number.parseFloat(paymoney)
        startpower = Number.parseFloat(startpower)
        stoppower = Number.parseFloat(stoppower)
        const range = stoppower - startpower // 功率范围
        const nextCommon1 = stoppower
        const nextCommon2 = stoppower + range
        const rate = paymoney / stoppower // 每功率收费多少钱
        const nextMoney = rate * range + lastItem.paymoney
        data = { paymoney: nextMoney, startpower: nextCommon1, stoppower: nextCommon2, id: new Date().getTime() }
    } else if (from === 'temtime') {
        if (typeof lastItem === 'undefined') {
            data = { sonname: '1小时', chargeTime: 60, paymoney: 1, id: new Date().getTime() }
        }
        let { paymoney } = lastItem
        paymoney = Number.parseFloat(paymoney)
        const nextCommon3 = paymoney + 1
        const nextChargeTime = nextCommon3 * 60
        const nextName = `${nextCommon3}小时`
        data = { sonname: nextName, chargeTime: nextChargeTime, paymoney: nextCommon3, id: new Date().getTime() }
    } else if (from === 'temmoney') {
        if (typeof lastItem === 'undefined') {
            data = { sonname: '1元', paymoney: 1, id: new Date().getTime() }
        }
        let { paymoney } = lastItem
        paymoney = Number.parseFloat(paymoney)
        const nextMoney = paymoney + 1
        const nextName = `${nextMoney}元`
        data = { sonname: nextName, paymoney: nextMoney, id: new Date().getTime() }
    }
    this.$set(this.tempData, from, [...gather, data])
}

// 删除子模板
export function handRemoveChildTem (from, id) {
    this.$dialog.confirm({
        title: '提示',
        message: '确认删除当前子模板吗？'
    })
    .then(() => {
        const list = this.tempData[from] || []
        this.$set(this.tempData, from, list.filter(item => item.id !== id))
    })
}
