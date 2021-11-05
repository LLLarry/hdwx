import { ref, provide } from '@vue/composition-api'
// import { merDisplayDisbingDevice } from '@/require/pay-manage'
import { merDisplayAreaDeviceData, merDisplayDisbingDevice } from '@/require/pay-manage'

import { Toast } from 'vant'
import dayjs from 'dayjs'

export const useInitProvide = () => {
    const initList = ref([])
    provide('initList', initList)
    const selectList = ref([])
    provide('selectList', selectList) // 选择的设备列表
    const initAreaList = ref([])
    provide('initAreaList', initAreaList) // 小区列表
    // 设备所属的商户信息和合伙人信息
    const initUser = ref([])
    provide('initUser', initUser)
    // 是否开启合伙人分摊缴费
    const apportion = ref(true)
    provide('apportion', apportion)
    return {
        initList, selectList, initAreaList, initUser, apportion
    }
}
/**
 * 初始化设备列表数据
 * @param {*} data 请求小区中的数据时,传入data
 */
export const useInitDeviceList = (refWrapper, data) => {
    initFn(refWrapper, data)
    // 重新加载
    const reload = () => {
        initFn(refWrapper, data)
    }
    return reload
}

/**
 * 根据时间戳判断返回什么样式类
 * 已过期 返回 red
 * 即将过期（15天） 返回 orange
 * 其他返回 ''
 * @param {*}  expirationTime 校验时间戳
 * @returns class类 String
 */
const checkTimeGetClass = (expiratimes) => {
    const nowTime = new Date(dayjs(new Date()).format('YYYY-MM-DD')).getTime()
    expiratimes = new Date(expiratimes)
    const days = (expiratimes - nowTime) / (24 * 60 * 60 * 1000)
    console.log()
    if (days <= 0) {
        return 'red'
    } else if (days <= 15) {
        return 'orange'
    } else {
        return ''
    }
}

function initFn ({ initList, selectList, initAreaList, initUser, apportion }, data) {
    (data ? merDisplayAreaDeviceData(data) : merDisplayDisbingDevice())
    .then(({ code, message, equiresult, net, blue, areaInfo, mer, listscanpa = [], authority }) => {
        const selectLists = []
        if (code === 200) {
            // 包装设备列表
            initList.value = equiresult.map(item => {
                // 筛选过期或即将过期的设备，放到选择的列表中
                const className = checkTimeGetClass(item.expiratimes)
                if (className) {
                    selectLists.push(item.code)
                }
                return {
                    ...item,
                    money: item.hardversionnum === '02' ? blue[item.hardversion] : net[item.hardversion],
                    class: className
                }
            })
            // 是否开启合伙人缴费
            apportion.value = authority && (authority.apportion === 1) // 是否开启合伙人的分摊缴费 0默认不分摊  1分摊
            selectList.value = selectLists
            initAreaList.value = areaInfo
            // 合伙人总分成比
            listscanpa = listscanpa || []
            // 合伙人的rank为-1 商户的rank为2
            listscanpa = listscanpa.map(item => { item.rank = -1; return item })
            const partPercent = listscanpa.reduce((acc, item) => (acc += item.percent), 0)
            // 商户和合伙人信息
            initUser.value = [
                { ...mer, percent: (100 - partPercent * 100) / 100, rank: 2 },
                ...listscanpa
            ]
        } else {
            Toast(message)
        }
    })
    .catch((e) => {
        console.log(e)
        Toast('异常错误')
    })
}
