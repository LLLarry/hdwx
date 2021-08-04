/**
 * 新增子模板处理函数
 * @param {*} from 新增那个子模板
 * @param {*} gather 子模板列表
 */
export const addChildTemHelper = (from, gather = []) => {
    const lastItem = gather[gather.length - 1]
    //  收费标准 （按功率计费）
    if (from === 'gather1') {
        if (typeof lastItem === 'undefined') {
            return { money: 0.25, common1: 0, common2: 200, id: new Date().getTime() }
        }
        let { money, common1, common2 } = lastItem
        money = Number.parseFloat(money)
        common1 = Number.parseFloat(common1)
        common2 = Number.parseFloat(common2)
        const range = common2 - common1 // 功率范围
        const nextCommon1 = common2
        const nextCommon2 = common2 + range
        const rate = money / common2 // 每功率收费多少钱
        const nextMoney = rate * range + lastItem.money
        return { money: nextMoney, common1: nextCommon1, common2: nextCommon2, id: new Date().getTime() }
    } else if (from === 'gather2') {
        if (typeof lastItem === 'undefined') {
            return { name: '1小时', chargeTime: 60, common3: 1, id: new Date().getTime() }
        }
        let { common3 } = lastItem
        common3 = Number.parseFloat(common3)
        const nextCommon3 = common3 + 1
        const nextChargeTime = nextCommon3 * 60
        const nextName = `${nextCommon3}小时`
        return { name: nextName, chargeTime: nextChargeTime, common3: nextCommon3, id: new Date().getTime() }
    } else if (from === 'gather3') {
        if (typeof lastItem === 'undefined') {
            return { name: '1元', money: 1, id: new Date().getTime() }
        }
        let { money } = lastItem
        money = Number.parseFloat(money)
        const nextMoney = money + 1
        const nextName = `${nextMoney}元`
        return { name: nextName, money: nextMoney, id: new Date().getTime() }
    }
}
