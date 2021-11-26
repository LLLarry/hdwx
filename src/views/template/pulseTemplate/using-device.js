// 正在使用当前模板的设备
import { removeSingleDeviceTemplate, updateDeviceTemplate } from '@/require/template'
import { toast, confirm } from '@/assets/js/vant-helper'
import { reactive, toRefs } from '@vue/composition-api'
export default ({ tempData, employDeviceinfo, allDeviceinfo }) => {
    const useingDeviceData = reactive({
        deviceList: [],
        repeatTitle: '',
        repeatIsShow: false
    })
    // 移除设备
    const removeDevice = (code) => {
        confirm('确认移除当前设备吗？')
        .then(() => {
            removeSingleDeviceTemplate({ code })
            .then(res => {
                if (res.code === 200) {
                    employDeviceinfo.value = employDeviceinfo.value.filter(item => item.code !== code)
                    toast('移除当前设备成功')
                } else {
                    toast('移除当前设备失败')
                }
            })
            .catch(() => {
                toast('异常错误')
            })
        })
    }

    // 切换复用设备是否显示
    const toggleRepeatIsShow = () => {
        if (!useingDeviceData.repeatIsShow) {
            useingDeviceData.deviceList = allDeviceinfo.value.filter(one => !employDeviceinfo.value.find(item => item.code === one.code))
            useingDeviceData.repeatTitle = `选中设备使用${tempData.value.tempname}模板`
        }
        useingDeviceData.repeatIsShow = !useingDeviceData.repeatIsShow
    }

    // 确认复用模板
    const repeatConfirm = async (list = []) => {
        try {
            const { code, message } = await updateDeviceTemplate({
                tempid: tempData.value.id,
                deviceList: JSON.stringify(list)
            })
            if (code === 200) {
               const selectList = allDeviceinfo.value.filter(one => list.includes(one.code))
               employDeviceinfo.value = employDeviceinfo.value.concat(selectList)
               toast('复用成功')
            } else {
               toast(message)
            }
        } catch (error) {
            console.log(error)
           toast('异常错误')
        }
        toggleRepeatIsShow()
    }
    return {
        removeDevice,
        toggleRepeatIsShow,
        repeatConfirm,
        ...toRefs(useingDeviceData)
    }
}
