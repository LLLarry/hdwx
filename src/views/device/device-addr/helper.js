import { reactive, ref, watch } from '@vue/composition-api'
import { inquireDeviceAddr, addOrRemoveAddr } from '@/require/device'
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
    initAddr(code)
        .then(addrlist => {
            list.value = addrlist
        })
        .catch((err) => {
            Toast(err)
        })
    // 重新加载
    const reload = () => {
        initAddr(code)
        .then(addrlist => {
            list.value = addrlist
        })
        .catch((err) => {
            Toast(err)
        })
    }
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
    let scanQrCodeInput, scanQrCodeIcon
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
        const value = scanQrCodeInput.value.trim()
        addOrRemoveAddrFn({
            code,
            addr: value,
            type: 1
        }, reloadList)
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

// 筛选从机地址
export const filterList = (keywordRef, ListRef) => {
    const flist = ref([])
    watch([keywordRef, ListRef], ([wkeywords, wlist]) => {
        const keywords = wkeywords.trim()
        if (keywords === '') {
            flist.value = wlist
        }
        flist.value = wlist.filter(addr => addr.includes(keywords))
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
    addOrRemoveAddr(data)
    .then(res => {
        if (Number(res.code) === 200) {
            Toast(`${typeString}成功`)
            reloadList && reloadList()
        } else {
            Toast(res.message)
        }
    })
    .catch(() => {
        Toast('异常错误')
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
