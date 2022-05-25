import { Toast, Dialog } from 'vant'
import { inject, ref, watch } from '@vue/composition-api'
import { insertSonTempV3, inquireTemplateV3, deleteSonTemp, amendTempV3, inquireDeviceTemlata, insertTempV3 } from '@/require/template'
import { createChildTemp } from '../helper'

// 通过子模板的键货值对应的type
const getType = (key) => key === 'tempower' ? 1 : key === 'temtime' ? 2 : key === 'temmoney' ? 3 : ''
// 通过模板id获取模板详情
export function getTempInitData (tempid, version) {
    const tempData = ref({})
    const copyTempData = ref({})
    const isSystemTem = ref(true) // 是否是系统模板
    const type = ref(1) // 1 编辑 2 新增
    const root = inject('$root')
    ;(async () => {
        try {
            type.value = typeof tempid !== 'undefined' ? 1 : 2
            const { code, message, resultdata } = await (type.value === 1 ? inquireTemplateV3({ tempid, tenantId: root.tenantId }) : inquireDeviceTemlata({ version }))
            if (code === 200) {
                if (type.value === 1) {
                    tempData.value = {
                        ...resultdata,
                        walletpay: resultdata.ifwalletpay === 1, // 是否临时充电
                        permit: resultdata.ifpermit === 1, // 是否退费
                        grade: resultdata.defaultstype === 1, // 1:按金额付费    2 :按时间付费
                        alipay: resultdata.ifalipay === 1 // 是否支持支付宝充电
                    }
                    isSystemTem.value = type.value === 1 && resultdata.merid === 0
                } else {
                    tempData.value = {
                        ...resultdata,
                        walletpay: resultdata.ifwalletpay === 1, // 是否临时充电
                        permit: resultdata.ifpermit === 1, // 是否退费
                        grade: resultdata.defaultstype === 1, // 1:按金额付费    2 :按时间付费
                        alipay: resultdata.ifalipay === 1, // 是否支持支付宝充电
                        tempname: '',
                        brand: '',
                        telephone: '',
                        merid: undefined
                    }
                    isSystemTem.value = false
                }
                copyTempData.value = JSON.parse(JSON.stringify(tempData.value))
            } else {
                Toast.fail(message)
            }
        } catch (error) {
            Toast.fail('异常错误')
        }
    })()
    return {
        tempData,
        copyTempData,
        isSystemTem,
        type
    }
}

/**
 * 创建功率子模板
 * @param {*} tempDataRef 主模板ref
 * @returns 创建的子模板
 */
const createTempowerChildTemp = (tempDataRef) => {
    const tempData = tempDataRef.value
    return createChildTemp(tempData.tempower, (lastItem) => {
        if (typeof lastItem === 'undefined') {
           return { paymoney: 0.25, startpower: 0, stoppower: 200, id: new Date().getTime(), type: 1 }
        }
        let { paymoney, startpower, stoppower } = lastItem
        paymoney = Number.parseFloat(paymoney)
        startpower = Number.parseFloat(startpower)
        stoppower = Number.parseFloat(stoppower)
        const range = stoppower - startpower // 功率范围
        const nextCommon1 = stoppower
        const nextCommon2 = stoppower + range
        const rate = paymoney / stoppower // 每功率收费多少钱
        const nextMoney = Number.parseFloat((rate * range + paymoney).toFixed(2))
        return { paymoney: nextMoney, startpower: nextCommon1, stoppower: nextCommon2, id: new Date().getTime(), type: 1 }
    })
}

/**
 * 创建时间子模板
 * @param {*} tempDataRef 主模板ref
 * @returns 创建的子模板
 */
const createTemtimeChildTemp = (tempDataRef) => {
    const tempData = tempDataRef.value
    return createChildTemp(tempData.temtime, (lastItem) => {
        if (typeof lastItem === 'undefined') {
            return { sonname: '1小时', chargeTime: 60, paymoney: 1, id: new Date().getTime(), type: 2 }
        }
        let { chargeTime } = lastItem
        chargeTime = Number.parseFloat(chargeTime)
        const nextChargeTime = chargeTime + 60
        const name = Number.parseFloat((nextChargeTime / 60).toFixed(1))
        const nextName = `${name}小时`
        return { sonname: nextName, chargeTime: nextChargeTime, id: new Date().getTime(), type: 2 }
    })
}

/**
 * 创建金额子模板
 * @param {*} tempDataRef 主模板ref
 * @returns 创建的子模板
 */
const createTemmoneyChildTemp = (tempDataRef) => {
    const tempData = tempDataRef.value
    return createChildTemp(tempData.temmoney, (lastItem) => {
        if (typeof lastItem === 'undefined') {
            return { sonname: '1元', paymoney: 1, id: new Date().getTime(), type: 3 }
        }
        let { paymoney } = lastItem
        paymoney = Number.parseFloat(paymoney)
        const nextMoney = paymoney + 1
        const nextName = `${nextMoney}元`
        return { sonname: nextName, paymoney: nextMoney, id: new Date().getTime(), type: 3 }
    })
}

/**
 * 添加充电模板Handler
 * @param {*} param {
 *  tempDataRef, 主模板ref
    from, 子模板键名
    async 是不是异步添加
}
 */
const addChildTempHadler = ({
    tempDataRef,
    copyTempDataRef,
    from,
    async
}) => {
    const copyGather = copyTempDataRef.value[from]
    const gather = tempDataRef.value[from]
    let data = {}
    switch (getType(from)) {
        case 1 : {
            const param = createTempowerChildTemp(tempDataRef)
            let { morm, elecnorm, tempower } = tempDataRef.value
            tempower = JSON.parse(JSON.stringify(tempower))
            tempower.push(param)
            // 修改充电说明
            data = Object.assign(param, {
                isUpdateChargelnfo: 1,
                hintMessage: createChargeInfoFn({
                    morm,
                    elecnorm,
                    tempower
                })
            })
        } break
        case 2 : data = createTemtimeChildTemp(tempDataRef); break
        case 3 : data = createTemmoneyChildTemp(tempDataRef); break
    }
    if (async) {
        insertSonTempV3({
            ...data,
            parentid: tempDataRef.value.id,
            id: undefined
        })
        .then(({ code, message, tempsonid: id }) => {
            if (code === 200) {
                gather.push({ ...data, id })
                copyGather.push({ ...data, id })
                Toast('子模板添加成功')
            } else {
                Toast(message)
            }
        })
        .catch(() => {
            Toast.fail('异常错误')
        })
    } else {
        gather.push({ ...data })
        copyGather.push({ ...data })
    }
}

/**
 * 添加主模板
 * @param {*} tempDataRef 主模板ref
 * @returns Function 添加主模板函数
 */
export const addChildTemp = (tempDataRef, copyTempDataRef, type) => ({ from }) => addChildTempHadler({ tempDataRef, copyTempDataRef, from, async: type.value === 1 })
/**
 * createAddChildTemp
 * @param {*} from 新增那个子模板 parentid 主模板id
 * @param {*} gather 子模板列表
 */

// 删除子模板
export function handRemoveChildTem ({ tempDataRef, copyTempDataRef, deleteid, from, async }) {
    const tempid = tempDataRef.value.id // 主模板id
    const copyGather = copyTempDataRef.value[from]
    const gather = tempDataRef.value[from]
    const index = gather.findIndex(item => item.id === deleteid)

    let params = {}
    if (getType(from) === 1) {
        let { morm, elecnorm, tempower } = tempDataRef.value
        tempower = JSON.parse(JSON.stringify(tempower))
        tempower.splice(index, index)
        params = {
            isUpdateChargelnfo: 1,
            hintMessage: createChargeInfoFn({
                morm,
                elecnorm,
                tempower
            })
        }
    }

    Dialog.confirm({
        title: '提示',
        message: '确认删除当前子模板吗？'
    })
    .then(() => {
        if (async) {
            deleteSonTemp({ tempid, id: deleteid, ...params })
            .then(({ code, message }) => {
                if (code === 200) {
                    gather.splice(index, 1)
                    copyGather.splice(index, 1)
                    Toast('子模板删除成功')
                } else {
                    Toast(message)
                }
            })
            .catch(() => {
                Toast.fail('异常错误')
            })
        } else {
            gather.splice(index, 1)
            copyGather.splice(index, 1)
        }
    })
}

// 添加子模板
export const deleteChildTemp = (tempDataRef, copyTempDataRef, type) => ({ from, id }) => handRemoveChildTem({ tempDataRef, copyTempDataRef, deleteid: id, from, async: type.value === 1 })

// 创建充电信息 / 充电说明
export const createChargeInfo = (tempDataRef) => {
    watch([() => tempDataRef.value.tempower, () => tempDataRef.value.morm, () => tempDataRef.value.elecnorm], ([tempower, morm, elecnorm], [oldTempower, oldMorm]) => {
        // 初始化时,不创建充电说明
        if (typeof oldTempower === 'undefined' && typeof oldMorm === 'undefined') return
        tempDataRef.value.hintMessage = createChargeInfoFn({
            morm,
            tempower,
            elecnorm
        })
    }, { deep: true })
}

// 转化switch
export const useSwitchForTemp = (tempDataRef) => {
    // 是否禁止退费和默认金额充电点击
    const forbidPermitOrStype = ref(false)
    function fmtflag (flag) {
        return flag ? 1 : 2
    }
    watch([
        () => tempDataRef.value.walletpay,
        () => tempDataRef.value.permit,
        () => tempDataRef.value.grade,
        () => tempDataRef.value.alipay
    ], ([walletpay, permit, grade, alipay]) => {
        tempDataRef.value.ifwalletpay = fmtflag(walletpay)
        tempDataRef.value.ifpermit = fmtflag(permit)
        tempDataRef.value.defaultstype = fmtflag(grade)
        tempDataRef.value.ifalipay = fmtflag(alipay)
        // 当不支持临时充电时，将是否支持退费和默认按金额充电给关掉
        if (!walletpay) {
            tempDataRef.value.permit = false
            tempDataRef.value.ifpermit = fmtflag(false)
            tempDataRef.value.grade = false
            tempDataRef.value.defaultstype = fmtflag(false)
            forbidPermitOrStype.value = true
        } else {
            forbidPermitOrStype.value = false
        }
    })
    return forbidPermitOrStype
}

// 充电计费方式
export const useChargeType = (tempDataRef) => {
    // 充电类型是否显示
    const chargeTypeIsShow = ref(false)
    // actions List
    const actions = ref([])
    // 打开充电类型
    const openChargeType = () => {
        chargeTypeIsShow.value = true
    }
    const chargeType = ref('')
    // 修改充电类型
    const changeChargeType = ({ id }) => {
        tempDataRef.value.morm = id
    }
    watch(() => tempDataRef.value.morm, morm => {
        actions.value = [
          { id: 1, name: '按照最大功率计费', subname: '按照充电设备上传的最大功率计费', color: (morm !== 2 && morm !== 3 && morm !== 4) ? '#07c160' : undefined },
          { id: 2, name: '按照实时功率计费', subname: '按照充电设备上传的实时功率计费', color: morm === 2 ? '#07c160' : undefined },
          { id: 3, name: '按照电量计费', subname: '按照用户实际使用的电量计费', color: morm === 3 ? '#07c160' : undefined },
          { id: 4, name: '组合计费', subname: '当超过实时功率计费的最大值时，使用按电量计费', color: morm === 4 ? '#07c160' : undefined }
        ]
        chargeType.value = (
            morm === 1 ? '按照最大功率计费'
            : morm === 2 ? '按照实时功率计费'
            : morm === 3 ? '按照电量计费'
            : morm === 4 ? '组合计费' : '— —'
        )
    })
    return {
        chargeTypeIsShow,
        actions,
        openChargeType,
        changeChargeType,
        chargeType
    }
}

// 保存编辑的主模板
const useEditTemp = (tempDataRef, copyTempDataRef) => {
    return () => {
        amendTempV3({ paratem: JSON.stringify(tempDataRef.value, null, 2) })
        .then(res => {
            if (res.code === 200) {
                Dialog.alert({
                    title: '提示',
                    message: '保存成功'
                })
                .then(() => {
                    copyTempDataRef.value = JSON.parse(JSON.stringify(tempDataRef.value))
                })
            } else {
                Dialog.alert({
                    title: '提示',
                    message: res.message
                })
            }
        })
        .catch(() => {
            Toast.fail('异常错误')
        })
    }
}

// 新增主模板
const useAddTemp = (tempDataRef, code) => {
    return (router) => {
        insertTempV3({ paratem: JSON.stringify(tempDataRef.value, null, 4) })
        .then(res => {
            Dialog.alert({
                title: '提示',
                message: res.code === 200 ? '添加成功' : res.message
            })
            .then(() => {
                if (res.code === 200) {
                    router && router.replace({ path: `/template/v3/${res.tempid}?code=${code}` })
                }
            })
        })
        .catch(() => {
            Toast.fail('异常错误')
        })
    }
}

// 返回上一步
const useGoBack = (tempDataRef, copyTempDataRef, type) => {
    return (router) => {
        if (type.value === 2) { // type为新增时，可以直接回退
            return router && router.go(-1)
        }
        const tempData = tempDataRef.value
        // 校验数据是否发生了改变
        const result = Object.entries(copyTempDataRef.value).every(([key, value]) => {
            if (['tempname', 'telephone', 'hintMessage', 'ifpermit', 'ifalipay', 'slotcardtime', 'morm', 'temptype', 'ifmonth', 'defaultstype', 'ifwalletpay', 'brand', 'elecnorm'].includes(key)) {
                value = value === null ? '' : value
                tempData[key] = tempData[key] === null ? '' : tempData[key]
                return value.toString() === tempData[key].toString()
            } else if (key === 'tempower') {
                return (value || []).every(({ paymoney, startpower, stoppower }, index) => {
                    const { paymoney: oldPaymoney, startpower: oldStartpower, stoppower: oldStoppower } = tempData[key][index]
                    return paymoney.toString() === oldPaymoney.toString() && startpower.toString() === oldStartpower.toString() && stoppower.toString() === oldStoppower.toString()
                })
            } else if (key === 'temtime') {
                return (value || []).every(({ sonname, chargeTime }, index) => {
                    const { sonname: oldSonname, chargeTime: oldChargeTime } = tempData[key][index]
                    return sonname.toString() === oldSonname.toString() && chargeTime.toString() === oldChargeTime.toString()
                })
            } else if (key === 'temmoney') {
                return (value || []).every(({ sonname, paymoney }, index) => {
                    const { sonname: oldSonname, paymoney: oldPaymoney } = tempData[key][index]
                    return sonname.toString() === oldSonname.toString() && paymoney.toString() === oldPaymoney.toString()
                })
            }
            return true
        })
        if (!result) {
            Dialog.alert({
                title: '提示',
                message: '请先点击右下角保存按钮'
            })
        } else {
            router && router.go(-1)
        }
    }
}

const useSortList = (tempDataRef) => {
    return ({ from, list }) => {
        console.log(from, list)
        const tempData = tempDataRef.value
        tempData[from] = list
    }
}

export const createNavList = ({
    typeRef,
    goBack,
    addTemp,
    editTemp,
    router,
    code,
    tempid,
    isSystemTem
}) => {
    const navList = ref([
        { text: '返回', icon: 'share-o', onClick: () => goBack(router) }
    ])
    watch([() => isSystemTem.value, () => typeRef.value], ([flag, type]) => {
       if (type === 1) { // 编辑
           if (flag) { // 系统模板
                navList.value = [
                    { text: '返回', icon: 'share-o', onClick: () => goBack(router) },
                    { text: '预览', icon: 'eye-o', onClick: () => router.push({ path: '/preview/v3', query: { code, tempid } }) }
                ]
           } else { // 非系统模板
                navList.value = [
                    { text: '返回', icon: 'share-o', onClick: () => goBack(router) },
                    { text: '预览', icon: 'eye-o', onClick: () => router.push({ path: '/preview/v3', query: { code, tempid } }) },
                    { text: '保存', icon: 'pending-payment', onClick: editTemp, type: 'info' }
                ]
           }
        } else { // 新增
            navList.value = [
                { text: '返回', icon: 'share-o', onClick: () => goBack(router) },
                { text: '新增', icon: 'pending-payment', onClick: () => addTemp(router), type: 'info' }
            ]
        }
    }, { immediate: true })
    return navList
}

export const useInitTemp = (tempid, version, code) => {
    // 获取模板信息，通过主模板id
    const {
        tempData: tempDataRef,
        copyTempData: copyTempDataRef,
        isSystemTem,
        type
    } = getTempInitData(tempid, version)
    const addChild = addChildTemp(tempDataRef, copyTempDataRef, type)
    const deleteChild = deleteChildTemp(tempDataRef, copyTempDataRef, type)
    useSwitchForTemp(tempDataRef)
    const forbidPermitOrStype = createChargeInfo(tempDataRef)
    // 获取编辑主模板函数
    const editTemp = useEditTemp(tempDataRef, copyTempDataRef)
    // 获取新增主模板函数
    const addTemp = useAddTemp(tempDataRef, code)
    // 返回上一步函数
    const goBack = useGoBack(tempDataRef, copyTempDataRef, type)
    // 排序子模板
    const sortList = useSortList(tempDataRef)
    return {
        tempDataRef, // 主模板数据
        isSystemTem, // 是否是系统模板
        type, // 1 编辑 2 新增
        addChild, // 添加子模板
        deleteChild, // 删除子模板
        forbidPermitOrStype, // 是否禁止退费和默认金额充电点击
        editTemp, // 编辑主模板
        addTemp, // 添加主模板
        goBack, // 返回上一步
        sortList
    }
}

// 创建收费说明
function createChargeInfoFn ({
    morm,
    tempower,
    elecnorm
}) {
    let chargeinfoText = ''
    if (morm === 3) { // 按照电量计费
        chargeinfoText = `每度电收费：${elecnorm}元`
    } else if (morm === 4) { // 组合计费
        let maxPower = 0
        for (const item of tempower) {
            if (item.stoppower > maxPower) {
                maxPower = item.stoppower
            }
        }
        const chargeInfoList = tempower.map(({ paymoney, startpower, stoppower }) => `每小时收费：${paymoney}元， 功率区间：${startpower}-${stoppower}瓦`)
        chargeinfoText = chargeInfoList.join('\n')
        chargeinfoText += `\n超过${maxPower}瓦，每度电收费：${elecnorm}元`
    } else {
        const chargeInfoList = tempower.map(({ paymoney, startpower, stoppower }) => `每小时收费：${paymoney}元， 功率区间：${startpower}-${stoppower}瓦`)
        chargeinfoText = chargeInfoList.join('\n')
    }
    return chargeinfoText
}
