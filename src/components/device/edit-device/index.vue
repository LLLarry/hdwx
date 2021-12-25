<template>
  <div class="d-inline-block">
    <div class="d-inline-block" @click="showChangePicker = true">
      <slot />
    </div>
    <!-- 请选择修改的硬件版本 -->
    <van-popup v-model="showChangePicker" position="top" get-container="#message" @click-overlay="close">
        <div class="padding-3 bg-gray">
            <h3 class="text-center margin-bottom-3 text-size-default">修改设备信息</h3>
            <van-form @submit="onSubmit">
                <van-field
                    v-model.trim="changeForm.devicename"
                    name="devicename"
                    label="设备名称"
                    placeholder="设备名称"
                />
                <div class="d-flex align-items-center bg-white">
                        <van-field
                            v-model.trim="changeForm.areaname"
                            name="areaname"
                            label="归属小区"
                            placeholder="归属小区"
                            readonly
                            @click="showAreaPicker = true"
                        />
                        <van-icon name="arrow" size=".45rem" class="margin-right-2" color="#666666" />
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">提交修改</van-button>
                </div>
            </van-form>
        </div>
    </van-popup>

    <!-- 小区列表 -->
    <van-popup v-model="showAreaPicker" round position="bottom" get-container="#message">
        <van-picker
            title="请选择小区列表"
            show-toolbar
            :columns="areaList"
            :default-index="defaultIndex"
            @confirm="onConfirmArea"
            @cancel="showAreaPicker = false"
        />
    </van-popup>
  </div>
</template>

<script>
import { getDealAreaListInfo, updateDeviceInfoByCode } from '@/require/device'
export default {
  props: {
    code: {
      type: String,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 小区默认选中的索引
    defaultIndex () {
      const areaname = (this.defaultValue || {}).areaname
      const index = this.areaList.findIndex(item => item.name === areaname)
      return index < 0 ? 0 : index
    }
  },
  data () {
    return {
      showChangePicker: false,
      changeForm: {},
      areaList: [], // 设备所属商户的小区列表
      showAreaPicker: false // 显示小区列表
    }
  },
  watch: {
    showChangePicker: {
      handler (flag) {
        if (!flag) return false
        this.getArrayList()
      }
    },
    defaultValue: {
      handler (value) {
        if (!value || Object.keys(value).length <= 0) {
          this.changeForm = {}
        } else {
          const { devicename, areaname } = value
          this.changeForm = { devicename, areaname }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 点击修改设备名/ 归属小区
    async getArrayList () {
        try {
            if (this.areaList && this.areaList.length <= 0) {
                const { code, resultlist } = await getDealAreaListInfo()
                if (code === 200) {
                    this.areaList = resultlist.map(item => ({
                        ...item,
                        text: item.name
                    }))
                }
            }
        } catch (error) {
            this.toast('异常错误')
        }
    },
    // 选中的小区
    onConfirmArea (value, index) {
        this.changeForm.areaname = value.name
        this.changeForm.aid = value.id
        this.showAreaPicker = false
    },
    // 提交修改设备信息
    onSubmit () {
        const { devicename, aid } = this.changeForm
        this.changeDeviceFn({ devicename, aid }, '修改成功')
    },
    // 修改设备信息
    async changeDeviceFn (data, msg) {
        try {
            const { code, message } = await updateDeviceInfoByCode({ code: this.code, ...data })
            if (code === 200) {
                this.$dialog.alert({
                    title: '提示',
                    message: msg
                })
                .then(() => {
                  this.$emit('changeDeviceInfo', this.changeForm)
                  this.close()
                })
            } else {
                this.$toast(message)
            }
        } catch (error) {
            this.$toast('异常错误')
        }
    },
    close ($Event) {
      console.log($Event)
      this.showChangePicker = false
    }
  }
}
</script>

<style>

</style>
