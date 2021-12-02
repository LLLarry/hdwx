// 正在使用当前模板的设备
import { getUnusedAreaInfo, updateAreaTopUp, deleteEmployTopupTempArea } from '@/require/charge-manage'
import { toast, confirm } from '@/assets/js/vant-helper'
import { reactive, toRefs } from '@vue/composition-api'
export default ({ tempData, resultwallet, resultonline }) => {
    const useingAreaData = reactive({
        areaList: [],
        repeatTitle: '',
        repeatIsShow: false,
        actionType: 1 // 1 钱包 2在线卡
    })
    // 移除设备
    const removeDevice = (aid, type) => {
        confirm('确认移除当前小区吗？')
        .then(() => {
          deleteEmployTopupTempArea({
            aid,
            type
          })
            .then(res => {
                if (res.code === 200) {
                  if (type === 1) {
                      resultwallet.value = resultwallet.value.filter(item => item.id !== aid)
                  } else {
                      resultonline.value = resultonline.value.filter(item => item.id !== aid)
                  }
                    toast('移除当前小区成功')
                } else {
                    toast('移除当前小区失败')
                }
            })
            .catch(() => {
                toast('异常错误')
            })
        })
    }

    // 切换复用设备是否显示
    const toggleRepeatIsShow = (tempid, type) => {
      if (useingAreaData.repeatIsShow) {
        useingAreaData.repeatIsShow = false
        return false
      }
      useingAreaData.repeatTitle = `【${type === 1 ? '钱包' : '在线卡'}】选择小区使用功能此模板`
      getUnusedAreaInfo({
        tempid,
        type
      })
      .then(res => {
        if (res.code === 200) {
          if (res.resultNoArea.length <= 0) return toast('暂无小区可以使用此模板')
          useingAreaData.areaList = res.resultNoArea.map(item => ({
            text: item.name,
            value: item.id,
            tempid,
            type
          }))
          useingAreaData.actionType = type
          useingAreaData.repeatIsShow = true
        } else {
          toast(res.message)
        }
      })
      .catch(() => {
          alert('异常错误')
      })
    }

    // 确认复用模板
    const repeatConfirm = async (list = []) => {
        try {
            const { code, message } = await updateAreaTopUp({
                tempid: tempData.value.id,
                type: useingAreaData.actionType,
                list: JSON.stringify(list)
            })
            if (code === 200) {
              const fmtList = list.map(id => {
                const one = useingAreaData.areaList.find(item => item.value === id)
                if (one) {
                  return {
                    name: one.text,
                    id: one.value
                  }
                } else {
                  return undefined
                }
              })
               if (useingAreaData.actionType === 1) {
                  resultwallet.value = resultwallet.value.concat(fmtList)
               } else {
                  resultonline.value = resultonline.value.concat(fmtList)
               }

               toast('成功')
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
        ...toRefs(useingAreaData)
    }
}
