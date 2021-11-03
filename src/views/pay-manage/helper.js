import { ref, provide } from '@vue/composition-api'
import { merDisplayDisbingDevice } from '@/require/pay-manage'
import { Toast } from 'vant'
import dayjs from 'dayjs'
export const useInitDeviceList = () => {
    const initList = ref([])
    provide('initList', initList)
    const selectList = ref([])
    provide('selectList', selectList) // 选择的设备列表
    const initAreaList = ref([])
    provide('initAreaList', initAreaList) // 小区列表
    merDisplayDisbingDevice()
    .then(({ code, message, equiresult, net, blue, areaInfo }) => {
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
            selectList.value = selectLists
            initAreaList.value = areaInfo
        } else {
            Toast(message)
        }
    })
    .catch((e) => {
        console.log(e)
        Toast('异常错误')
    })
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
