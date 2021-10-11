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

export const isiOS = () => {
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
}
