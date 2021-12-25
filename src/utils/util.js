import * as dayjs from 'dayjs'
import { Dialog } from 'vant'
/**
 * 获取元素的类型： number、string、array、regexp ...
 * @param {*} e 元素
 * @returns string 类型的小写
 */
export const getType = (e) => {
    return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}

/**
 * 格式化日期
 * @param {Date | String} date date对象或日期类型的字符串
 * @param {*} type 按照dayjs格式的字符串
 * @returns 解析之后的字符串
 */
export const fmtDate = (date, type = 'YYYY-MM-DD HH:mm:ss') => {
    if (/^\d+$/.test(date)) date = Number.parseInt(date)
    return dayjs(date).format(type)
}

/**
 * 格式化金额
 * @param {Number} money money 格式化金额
 * @param {*} digit 保留几位小数
 * @returns 解析之后的金额字符串
 */
 export const fmtMoney = (money, digit = 2) => {
    if (typeof money !== 'number') {
        money = Number.parseFloat(money)
        money = Number.isNaN(money) ? 0 : money
    }
    return money.toFixed(digit)
}

/**
 * 日期范围
 * @param {Date} date 起始日期
 * @param {Number} day 推迟天数
 * @returns [Date, Date] 日期数组
 */
 export const dateRange = (date, day = 0, type = 'YYYY-MM-DD HH:mm:ss') => {
    date = new Date(date)
    const times = date.getTime()
    if (Number.isNaN(times)) {
        throw TypeError('date argument is not Date type')
    }
    const newTimes = times - day * 24 * 60 * 60 * 1000
    if (times < newTimes) {
        return [fmtDate(new Date(times), type), fmtDate(new Date(newTimes), type)]
    } else {
        return [fmtDate(new Date(newTimes), type), fmtDate(new Date(times), type)]
    }
}

/**
 * 获取指定日期所属的周一 和 周日日期
 * @param {Date} date
 * @param {Number} num 当前周的 正数：前几个周 负数： 后几个周
 * @param {Number} type 格式化类型
 * @returns [Date, Date] 日期数组
 */
export const getWeekRange = (date = new Date(), num = 0, type = 'YYYY-MM-DD HH:mm:ss') => {
    date = new Date(date)
    const times = date.getTime()
    if (Number.isNaN(times)) {
        throw TypeError('date argument is not Date type')
    }
    if (getType(num) === 'string') {
        type = num
        num = 0
    }
    const daysValue = dayjs(date).day() === 0 ? dayjs(date).add(-1, 'day') : dayjs(date)
    const start = daysValue.startOf('week').add(1, 'day').add(num, 'week').format(type)
    const end = daysValue.endOf('week').add(1, 'day').add(num, 'week').format(type)
    return [start, end]
}

/**
 * 获取指定日期所属的月初 和 月末日期
 * @param {Date} date
 * @param {Number} num 当前月的 正数：前几个月 负数： 后几个月
 * @param {String} type 格式化类型
 * @returns [Date, Date] 日期数组
 */
 export const getMonthRange = (date = new Date(), num = 0, type = 'YYYY-MM-DD HH:mm:ss') => {
    date = new Date(date)
    const times = date.getTime()
    if (Number.isNaN(times)) {
        throw TypeError('date argument is not Date type')
    }
    if (getType(num) === 'string') {
        type = num
        num = 0
    }
    const start = dayjs(date).add(num, 'month').startOf('month').format(type)
    const end = dayjs(date).add(num, 'month').endOf('month').format(type)
    return [start, end]
}

/**
 * 查询是否是苹果设备
 * @returns Boolean
 */
export const isiOS = () => {
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
}

/**
 * 获取随机数
 * @returns String
 */
 export const getRamdom = () => {
    const r = Math.round(Math.random() * 255)
    const g = Math.round(Math.random() * 255)
    const b = Math.round(Math.random() * 255)
    const color = r << 16 | g << 8 | b
    return color.toString(16)
}

/**
 * 通过硬件版本号获取设备的“端口数量”和“扫码路径”以及“参数键名”
 * @returns Boolean
 */
 export const getInfoByHdVersion = (hdVersion) => {
    const map = { // 硬件版本号对应端口数量
        '00': 10,
        '01': 10,
        '02': 2,
        '03': 10,
        '04': 0,
        '05': 16,
        '06': 20,
        '07': 1,
        '08': 10,
        '09': 2,
        10: 20,
        11: 2,
        12: 2
    }
    if (Number(hdVersion) !== 11) { // 非一拖二设备
        return {
            portNum: map[hdVersion], // 端口数量
            path: '/oauth2pay', // 扫设备二维码路径
            key: 'code', // 扫设备二维码键名
            portPath: '/oauth2Portpay', // 扫端口二维码路径
            portKey: 'codeAndPort' // 扫端口二维码键名
        }
    } else { // 一拖二设备
        return {
            portNum: map[hdVersion], // 端口数量
            path: '/oauth2pay', // 扫设备二维码路径
            key: 'code', // 扫设备二维码键名
            portPath: '/oauth2Addrpay', // 扫从机二维码路径
            portKey: 'addrnum' // 扫从机二维码键名
        }
    }
}

/**
 * 通过硬件版本号获取硬件版本名
 * @param {*} hv 硬件版本号
 * @returns String
 */
export const getDeviceVersionName = (hv) => {
    const map = {
        '00': '出厂默认设置',
        '01': '十路智慧款',
        '02': '电轿款',
        '03': '脉冲板子',
        '04': '离线充值机',
        '05': '十六路智慧款',
        '06': '二十路智慧款',
        '07': '单路交流桩',
        '08': '新版10路智慧款V3',
        '09': '新版2路智慧款V3',
        10: '新版20路智慧款V3',
        11: '1拖2',
        12: '双路交流桩'
    }
    return map[hv]
}

/**
 * 通过硬件版本号获取硬件版本
 * @param {*} params 硬件版本号 / 类型名
 * @returns String 类型名 / 硬件版本号list
 */
export const getVersion = (params) => {
    const map = {
        v2: ['00', '01', '02', '05', '06'], // v2版本
        pulse: ['03'], // 脉冲版本
        offline: ['04'], // 离线版本
        'v2-car': ['07', '12'], // v2汽车桩版本
        v3: ['08', '09', '10'], // v3版本
        'v3-addr': ['11'] // v3一拖二版本
    }
    if (/^\d{2}$/.test(params)) {
        for (const [key, list] of Object.entries(map)) {
            if (list.includes(params)) {
                return key
            }
        }
    } else {
        return map[params]
    }
}

export const noOpen = () => {
    Dialog.alert({
        title: '提示',
        message: '对不起，此功能暂未开放！'
    })
}

/**
 * paytype转化名称
 * @param {*} payType 支付方式
 * @returns 对应的名称
 */
export const payTypeToName = (payType) => {
    switch (payType) {
        case 1 :
            return '钱包'
        case 2 :
            return '微信'
        case 3 :
            return '支付宝'
        case 4 :
            return '包月'
        case 5 :
            return '投币'
        case 6 :
            return '离线卡'
        case 7 :
            return '在线卡'
        case 8 :
            return '支付宝小程序'
        case 12 :
            return '银联'
        default:
            return ''
    }
}

/**
 * 通过platform获取微信公众号信息
 * @param {*} platform number
 * @returns { name: 公众号名称，key: 名称缩写  }
 */
export const getWechatPublicAccountInfo = platform => {
    getWechatPublicAccountInfo.DEFAULT = {
        name: '自助充电平台',
        key: 'zzcdpt'
    }
    if ([0, 1].includes(platform)) {
        return {
            name: '自助充电平台',
            key: 'zzcdpt'
        }
    }
    // if (platform === 2) {
    //     return {
    //         name: '兴煌科技',
    //         key: 'xhkj'
    //     }
    // }
    // if (platform === 3) {
    //     return {
    //         name: '易安居科技',
    //         key: 'yankj'
    //     }
    // }
    if (platform === 5) {
        return {
            name: '智慧充电服务平台',
            key: 'jn',
            scale: 0.8
        }
    }
}
