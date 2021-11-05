import { computed, inject, ref, watch } from '@vue/composition-api'
import { merWxPayment, merPayment } from '@/require/pay-manage'
import wxpay from '@/utils/wxUtil/wxpay'
import { Dialog, Toast } from 'vant'
export const useInjectList = () => {
    const selectList = inject('selectList') // 选择的设备
    const initList = inject('initList') // 初始化列表数据
    const initUser = inject('initUser') // 商户和合伙人信息
    const apportion = inject('apportion') // 合伙人是否分摊缴费
    return {
        selectList,
        initList,
        initUser,
        apportion
    }
}

// 选择的设备信息
export const useSelectListMap = (initListRef, selectListRef, initUserRef, apportionRef) => {
    // 获取设备列表
    return computed(() => {
        // 选择的设备号list
        const selectList = selectListRef.value
        // 过滤选择的设备信息
        const fmtterSelectList = initListRef.value.filter(({ code }) => selectList.includes(code))
        // 选择的设备总金额
        const totalMoney = fmtterSelectList.reduce((acc, item) => {
            acc += item.money
            return acc
        }, 0)
        // 要提交的设备信息
        const devices = fmtterSelectList.map(device => ({ code: device.code, totalMoney: device.money }))
        // 要展示的用户信息
        const usersInfo = initUserRef.value.map(user => {
            if (apportionRef.value) {
                return ({ ...user, payMonet: user.percent * 1000 * totalMoney / 1000 })
            } else {
                return { ...user, payMonet: user.rank === -1 ? 0 : totalMoney }
            }
        })
        // 要提交的用户信息
        const users = usersInfo.slice(0, (apportionRef.value ? usersInfo.length : 1))
        // 选择的设备转化为字符串
        const selectListString = selectList.join(',')
        return {
            isSelect: !!selectList.length, // 是否选择了设备
            count: selectList.length, // 选择的数量
            money: totalMoney, // 选择的设备总金额
            selectDevices: selectListString, // 选择的设备转化为字符串
            devices,
            users,
            usersInfo,
            paytype: getPaytype(users, devices)
        }
    })

    // 通过要提交的users和devices生成paytype的值
    function getPaytype (users, devices) {
        let paytype
        if (users.length <= 1) { // 无合伙人
            if (devices.length <= 1) { // 选择一台设备
                paytype = 0
            } else {
                paytype = 1
            }
        } else { // 有合伙人
            if (devices.length <= 1) { // 选择一台设备
                paytype = 2
            } else {
                paytype = 3
            }
        }
        return paytype
    }
}

// 切換是是否显示选中信息
export const useToggleSelectInfo = () => {
    const showSelectInfo = ref(false)
    return showSelectInfo
}

// 在小区设备中监听 selectInfo的改变，将users的数据传递给父组件使用
export const useWatchUserChange = (selectInfoRef, context) => {
    watch(() => selectInfoRef.value.usersInfo, (usersInfo) => {
        context.emit('setUsers', usersInfo)
    }, { immediate: true, deep: true })
}

// action-sheet 配置
export const useActionSheet = ({ apportion: apportionRef, selectInfo: selectInfoRef, aid = 0, emit }) => {
    // 是否展示actions面板
    const actionShow = ref(false)
    // actions面板数据
    const actions = computed(() => {
        const apportion = apportionRef.value
        return [
            ((apportion && selectInfoRef.value.usersInfo.length > 1) ? { name: '微信支付', disabled: true, subname: '您已开启分摊交费，不支持微信支付' } : { name: '微信支付' }),
            { name: '钱包支付' }
        ]
    })
    // 选择支付方式后的回调函数
    const select = (action, index) => {
        const { users, devices, paytype } = selectInfoRef.value
        if (index === 0) { // 微信支付
            const data = {
                openid: users[0].openid,
                payMoney: users[0].payMonet,
                users: JSON.stringify(users[0]),
                devices: JSON.stringify(devices),
                id: aid
            }
            wechatPay(data, emit)
        } else if (index === 1) { // 钱包支付
            const data = {
                users: JSON.stringify(users),
                devices: JSON.stringify(devices),
                paytype,
                id: aid
            }
            walletPay(data, emit)
        }
    }
    return {
        actionShow,
        actions,
        select
    }
}
// 微信支付
async function wechatPay (data, emit) {
    try {
        const { wolferror, wolferrorinfo, ...config } = await merWxPayment(data)
        if (wolferror === 1) {
            Toast.fail('wolferrorinfo')
        } else {
            wxpay(config)
            .then((res) => {
                Dialog.alert({
                    title: '提示',
                    message: res
                })
                .then(() => {
                    emit('reload')
                })
            })
            .catch(err => {
                Dialog.alert({
                    title: '提示',
                    message: err
                })
            })
        }
    } catch (error) {
        Toast.fail('异常错误')
    }
}

// 钱包支付
async function walletPay (data, emit) {
    try {
        const { code, message } = await merPayment(data)
        if (code === 200) {
            Dialog.alert({
                title: '提示',
                message: '缴费成功'
            })
            .then(() => {
                emit('reload')
            })
        } else if ([100, 400, 401, 402, 405].includes(code)) {
            Dialog.alert({
                title: '提示',
                message
            })
        } else {
            Dialog.alert({
                title: '提示',
                message: '缴费失败'
            })
        }
    } catch (error) {
        console.log(error)
        Toast.fail('异常错误')
    }
}
