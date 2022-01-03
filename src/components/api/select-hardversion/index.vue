<template>
  <div>
     <!-- 请选择修改的硬件版本 -->
    <van-popup v-model="showSelectHardVersion" round position="bottom" @closed="closeFn">
        <van-picker
            title="请选择硬件版本"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="close"
        />
    </van-popup>
  </div>
</template>

<script>
import { getDeviceVersionName } from '@/utils/util'
import { updateDeviceInfoByCode } from '@/require/device'
/* 修改硬件版本号 */
/*
    修改规则：
    00 --> 01、02、08、09
    01 <--> 08
    02 <--> 09
    06 <--> 10
*/
const initMap = { // 硬件版本号所能转化的硬件版本号
    '00': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    '01': ['08'],
    '02': ['09'],
    '06': ['10'],
    '08': ['01'],
    '09': ['02'],
    10: ['06']
}

export default {
  data () {
    return {
      showSelectHardVersion: false
    }
  },
  computed: {
    columns () {
      if (this.hardversion) {
        return (initMap[this.hardversion] || []).map(hv => `${hv} ${getDeviceVersionName(hv)}`)
      } else {
        return []
      }
    }
  },
  methods: {
    close () {
      this.showSelectHardVersion = false
    },
    onConfirm (value, index) {
      const [hardversion] = value.split(/\s+/) || []
      const promise = this.changeDeviceFn({ hardversion })
      this.selectBack(promise)
      this.close()
    },
    closeFn () {
      const el = this.$el
      el && el.remove()
    },
    // 修改硬件版本号
    async changeDeviceFn (data) {
        try {
            const { code, message } = await updateDeviceInfoByCode({ code: this.code, ...data })
            if (code === 200) {
                return Promise.resolve({
                  message: '切换成功',
                  hardversion: data.hardversion,
                  devicenum: this.code
                })
            } else {
              return Promise.reject(new Error(message))
            }
        } catch (error) {
            return Promise.reject(new Error('异常错误'))
        }
    }
  }
}
</script>
