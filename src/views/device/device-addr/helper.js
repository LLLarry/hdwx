import { inject, reactive, ref, watch } from '@vue/composition-api'
import { inquireDeviceAddr, addOrRemoveAddr, inquireDeviceStatus, queryPortStatus, startCharge, stopCharge, lockOrUnlockPort } from '@/require/device'
import { Toast } from 'vant'
import { scanQRCode } from '@/utils/wechat-util'
import parseURL from '@/utils/parse-url'
const { PROXY_BASE_URL } = HDWX
// 搜索部分hook
export const useSearchook = () => {
    const keywords = ref('')
    const isShowSearch = ref(false)
    return {
        keywords,
        isShowSearch
    }
}

// 通过设备号获取从机地址
export const useAddrList = (code) => {
    const list = ref([])
    // 初始化数据喊函数
    const initData = () => {
        initAddr(code)
        .then(addrlist => {
            const promises = addrlist.map(addr => inquireDeviceStatus({ code, addr }))
            Promise.allSettled(promises).then((res) => {
                const l = addrlist.map(addr => {
                    const one = res.find(item => item.value.addr === addr)
                    let map = {
                        updateTime: '',
                        allPortStatusList: []
                    }
                    if (one && one.value) {
                        // remoteTime: 240, // 默认远程充电时间
                        //     remoteElec: 1 // 默认远程充电电量
                        const { allPortStatusList = [] } = one.value
                        const portStatusList = allPortStatusList
                            .filter(st => typeof st === 'object' && st !== null)
                            .map(st => ({
                                ...st,
                                remoteTime: 240, // 默认远程充电时间
                                remoteElec: 1 // 默认远程充电电量
                            }))
                        map = {
                            ...one.value,
                            allPortStatusList: portStatusList
                        }
                    }
                    return ({
                        addr,
                        ...map
                    })
                })
                list.value = l
            })
        })
        .catch((err) => {
            Toast(err)
        })
    }
    // 执行一次
    initData()
    // 重新加载
    const reload = () => initData()
    return [list, reload]
}

// 生成从机二维码code
export const useQrcode = (context) => {
    const qrWrapper = reactive({
        qrcode: {
            value: '',
            background: '#FFFFFF', // 二维码背景色
            size: context.root.$store.state.global.clientWidth * 0.6, // 二维码大小
            key: new Date().getTime(), // 二维码唯一标识
            title: '从机'
        },
        qrIsShow: false
    })
    // 展示二维码
    const showQrcode = (addr) => {
        qrWrapper.qrcode.value = `${PROXY_BASE_URL}/oauth2Addrpay?addrnum=${addr}`
        qrWrapper.qrcode.title = `从机${addr}`
        qrWrapper.qrIsShow = true
    }
    // 关闭二维码
    const hideQrcode = () => {
        qrWrapper.qrIsShow = false
    }
    return {
        qrWrapper,
        showQrcode,
        hideQrcode
    }
}

// 添加从机地址
export const useAddAddr = (context, code, reloadList) => {
    const bindErrorInfo = ref({
        error: false // 是否有错误信息
    })
    // 添加从机
    const addAddr = () => {
        let scanQrCodeInput, scanQrCodeIcon
        // 调起微信扫一扫，扫描二维码
        const bindFn = () => {
            scanQRCode()
            .then(url => {
                const { status, message, ...result } = parseURL(url)
                    if (status !== 200) return this.$toast(message)
                    if (!result.addrnum) return this.$toast('请扫描从机的二维码')
                    scanQrCodeInput.value = result.addrnum
                })
        }
        context.root.$dialog.confirm({
            title: '提示',
            message: `
                <p>请输入或扫码填写从机号</p>
                <div class="d-flex justify-content-between">
                    <input id="scanQrCodeInput" class="w-75 border-1 border-ccc padding-y-1 padding-x-3" placeholder="请输入从机号" />
                    <div id="scanQrCodeIcon" class="w-25 d-flex justify-content-center align-items-center">
                        <i class="iconfont icon-saomiao text-size-lg text-primary"></i>
                    </div>
                </div>
            `.replace(/[\n\r]/g, '').trim()
        })
        .then(() => {
            // 获取从机号
            const value = scanQrCodeInput.value.trim()
            // 添加从机
            addOrRemoveAddrFn({
                code,
                addr: value,
                type: 1
            }, reloadList)
            .catch(err => {
                alert(err)
            })
        })
        .catch(e => {
            console.log(bindErrorInfo)
            bindErrorInfo.value.error = true
        })
        .finally(() => {
            scanQrCodeIcon.removeEventListener('click', bindFn)
        })
        context.root.$nextTick(() => {
            scanQrCodeInput = document.querySelector('#scanQrCodeInput')
            scanQrCodeIcon = document.querySelector('#scanQrCodeIcon')
            scanQrCodeIcon.addEventListener('click', bindFn)
        })
    }

    return {
        addAddr,
        bindErrorInfo
    }
}

// 筛选从机地址
export const filterList = (keywordRef, ListRef) => {
    const flist = ref([])
    watch([keywordRef, ListRef], ([wkeywords, wlist]) => {
        const keywords = wkeywords.trim()
        if (keywords === '') {
            flist.value = wlist
        }
        flist.value = wlist.filter(addrMap => addrMap && addrMap.addr.includes(keywords))
    })
    return flist
}

// 解绑从机地址
export const unbindAddr = (context, code, addr, reloadList) => {
    context.root.$dialog.confirm({
        title: '提示',
        message: '确认解绑从机地址吗？'
    })
    .then(() => {
        addOrRemoveAddrFn({
            type: 2,
            code,
            addr
        }, reloadList)
    })
}

function addOrRemoveAddrFn (data, reloadList) {
    const typeString = data.type === 1 ? '添加' : data.type === 2 ? '删除' : ''
    const isAdd = data.type === 1 // 是否是添加
    return new Promise((resolve, reject) => {
        addOrRemoveAddr(data)
        .then(res => {
            if (Number(res.code) === 200) {
                Toast(`从机${data.addr}${typeString}成功`)
                reloadList && reloadList()
                resolve(res)
            } else {
                reject(res.message)
                if (!isAdd) {
                    Toast(res.message)
                }
            }
        })
        .catch(() => {
            reject(new Error('异常错误'))
            if (!isAdd) {
                Toast('异常错误')
            }
        })
    })
}

function initAddr (code) {
    return new Promise((resolve, reject) => {
        inquireDeviceAddr({ code })
        .then(res => {
            if (Number(res.code) === 200) {
                resolve(res.addrlist)
            } else {
                reject(res.message)
            }
        })
        .catch(() => {
            reject(new Error('异常错误'))
        })
    })
}

// 端口状态
export const usePortStatus = (initList) => {
    const root = inject('$root')
    // 更新端口状态
    const updatePortStatus = (data) => {
        queryPortStatus(data).then(res => {
            if (
              res.wolfcode === '1000' ||
              Number(res.code) === 200 ||
              res.returncode === 200
            ) {
                root.$toast('更新成功')
                const { updateTime, ...portStatus } = res.result || {}
                initList.value = initList.value.map(addrMap => {
                    if (addrMap.addr === data.addr) {
                        const portStatusList = JSON.parse(JSON.stringify(addrMap.allPortStatusList))
                        const index = portStatusList.findIndex(one => Number(one.port) === Number(data.port))
                        portStatusList.splice(index, 1, {
                            ...portStatusList[index],
                            ...portStatus
                        })
                        return {
                            ...addrMap,
                            updateTime,
                            allPortStatusList: portStatusList
                        }
                    } else {
                        return addrMap
                    }
                })
            } else {
              root.$toast(res.message || res.wolfmsg)
            }
          })
    }
    // 远程充电
    const remoteCharge = ({ code, addr, port, time, elec, money = 1 }) => {
        // 从机
        startCharge({
            code, addr, port, time, elec, money
        })
            .then(res => {
              if (
                res.wolfcode === '1000' ||
                Number(res.code) === 200 ||
                res.returncode === 200
              ) {
                root.$dialog
                  .alert({
                    title: '提示',
                    message: `${port}号端口，远程充电成功`
                  })
                  .then(() => {
                    updatePortStatus({
                        code,
                        addr,
                        port
                    })
                  })
              } else {
                root.$toast(res.message || res.wolfmsg)
              }
            })
            .catch(() => {
                root.$toast('异常错误')
            })
    }

    // 远程断电
    const remoteEndCharge = ({ code, addr, port }) => {
        stopCharge({ code, addr, port })
            .then(res => {
              if (
                res.wolfcode === '1000' ||
                Number(res.code) === 200 ||
                res.returncode === 200
              ) {
                root.$toast(`${port}号端口，断电成功！`)
                setTimeout(() => {
                    updatePortStatus({
                        code,
                        addr,
                        port
                    }) // 更新端口状态
                }, 2000)
              } else {
                root.$toast(res.message || res.wolfmsg)
              }
            })
            .catch(() => {
                root.$toast('异常错误')
            })
    }

    const lockOrUnlockPortStatus = ({ code, addr, port, status }) => {
        lockOrUnlockPort({ code, addr, port, status }).then(res => {
            if (Number.parseInt(res.code) === 200) {
                const statusStr = status === 0 ? '禁用' : status === 1 ? '空闲' : '未知'
                const msg = `${port}端口状态已更改为“${statusStr}”`
                updatePortStatus({
                    code,
                    addr,
                    port
                }) // 更新端口状态
                root.$toast(msg)
            } else {
                root.$toast(res.message)
            }
        })
        .catch(e => {
            root.$toast('异常错误')
        })
    }
    return {
        updatePortStatus,
        remoteCharge,
        remoteEndCharge,
        lockOrUnlockPortStatus
    }
}
