import * as dayjs from 'dayjs'
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
        '09': 16,
        10: 20,
        11: 0
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
        11: '1拖2'
    }
    return map[hv]
}
