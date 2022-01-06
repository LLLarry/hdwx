import { portstate1, queryAddrAllPortStatus } from '@/require/device'
/**
 * 更新端口状态（普通设备和一拖二设备）
 * @param {} data 请求参数 addr boolean 是否是addr
 * @returns Promise
 */
export const updatePortStatusHook = (data, addr) => {
    if (addr) {
        return updatePortStatusForAddr(data)
    }
    return updatePortStatusForNormal(data)
}

/**
 * 非一拖二设备更新端口状态
 * @param {*} param { code: string }
 * @returns Promise
 */
function updatePortStatusForNormal (data) {
    return new Promise((resolve, reject) => {
        try {
            portstate1(data, '状态更新中')
            .then(map => {
                if (map.state === 'error') return reject(new Error('连接失败，请确认设备是否在线'))
                const portlist = {}
                const regexp = /^param(\d+)$/
                for (const [key, value] of Object.entries(map)) {
                    if (regexp.test(key)) {
                        const port = key.match(regexp)[1]
                        const portStatus = value === '空闲' ? 1 : value === '使用' ? 2 : value === '故障' ? 3 : -1
                        if (portStatus > 0) {
                            portlist[port] = portStatus
                        }
                    }
                }
                resolve(portlist)
            })
            .catch(() => {
                reject(new Error('异常错误'))
            })
        } catch (error) {
            reject(new Error('异常错误'))
        }
    })
}

/**
 * 一拖二设备更新端口状态
 * @param {*} data { code: string, addr: string, nowtime: string }
 * @returns Promise
 */
function updatePortStatusForAddr (data) {
    return new Promise((resolve, reject) => {
        try {
            queryAddrAllPortStatus(data)
            .then(({ code, message, portlist }) => {
                if (code === 200) {
                    resolve(portlist)
                } else {
                    reject(message)
                }
            })
       } catch (error) {
            reject(new Error('异常错误'))
       }
    })
}
