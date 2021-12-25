<template>
  <div class="device-info bg-gray">
      <van-nav-bar
          title="设备信息"
          left-text="返回"
          left-arrow
          @click-left="$router.go(-1)"
          class="shadow position-fixed w-100 fixed-header"
      />
      <main>
          <div class="padding-3">
            <ul class="bg-white rounded-md padding-y-2 shadow">
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">设备编号</span>
                  <span>{{code}}</span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">设备名称</span>
                  <span>
                      {{ info.devicename || '— —' }}
                        <edit-device
                            :code="code"
                            :default-value="info"
                            @changeDeviceInfo="changeDeviceInfo"
                        >
                          <van-icon name="edit" size=".5rem" class="text-success" />
                        </edit-device>
                  </span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">小区名称</span>
                  <span>
                        {{ info.areaname || '— —' }}
                        <edit-device
                            :code="code"
                            :default-value="info"
                            @changeDeviceInfo="changeDeviceInfo"
                        >
                          <van-icon name="edit" size=".5rem" class="text-success" />
                        </edit-device>
                    </span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">设备CCID</span>
                  <span>{{ info.deviceccid }}</span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">设备IMEI</span>
                  <span>{{ info.deviceimei }}</span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                  <span class="text-666">信号强度</span>
                  <span>{{ info.csq }}</span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1">
                    <span class="text-666">硬件版本</span>
                    <span class="d-inline-flex align-items-center">{{info.deviceversion}} {{ info.hvName }}
                        <van-button type="primary" size="mini" class="margin-left-1" @click="showPicker = true" v-if="columns.length > 0">修改硬件版本</van-button>
                    </span>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between padding-x-3 padding-y-1 margin-top-3">
                    <van-button type="danger" round block @click="handleUnBindDevice">解绑设备</van-button>
                </div>
              </li>
            </ul>
          </div>
      </main>

    <!-- 请选择修改的硬件版本 -->
    <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            title="请选择硬件版本"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
    </van-popup>

    <!-- 请选择修改的硬件版本 -->
    <!-- <van-popup v-model="showChangePicker" position="top">
        <div class="padding-3 bg-gray">
            <h3 class="text-center margin-bottom-3 text-size-default">修改设备信息</h3>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="changeForm.devicename"
                    name="devicename"
                    label="设备名称"
                    placeholder="设备名称"
                />
                <div class="d-flex align-items-center bg-white">
                        <van-field
                            v-model="changeForm.areaname"
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
    </van-popup> -->

    <!-- 小区列表 -->
    <!-- <van-popup v-model="showAreaPicker" round position="bottom">
        <van-picker
            title="请选择小区列表"
            show-toolbar
            :columns="areaList"
            @confirm="onConfirmArea"
            @cancel="showAreaPicker = false"
        />
    </van-popup> -->
  </div>
</template>

<script>
import { inquireDeviceMmanageInfo, updateDeviceInfoByCode, dealUnbindDevice } from '@/require/device'
import { getDeviceVersionName } from '@/utils/util'
import EditDevice from '@/components/device/edit-device'
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
            code: this.$route.params.code,
            info: {},
            columns: [], // 可选的硬件版本号
            showPicker: false, // 是否显示可选的硬件版本号列表
            showChangePicker: false // 是否显示修改设备名称、归属小区弹框
        }
    },
    components: {
        EditDevice
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
            const { code, message, ...info } = await inquireDeviceMmanageInfo({ code: this.code })
                if (code === 200) {
                    this.info = {
                        ...info,
                        hvName: getDeviceVersionName(info.deviceversion)
                    }
                    this.changeForm = { ...info }
                    this.columns = (initMap[info.deviceversion] || []).map(hv => `${hv} ${getDeviceVersionName(hv)}`)
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        onConfirm (value, index) {
            const hv = value.split(/\s+/)[0]
            this.changeDeviceFn({ hardversion: hv }, '硬件版本号更换成功')
            this.showPicker = false
        },
        // 修改硬件版本号
        async changeDeviceFn (data, msg) {
            try {
                const { code, message } = await updateDeviceInfoByCode({ code: this.code, ...data })
                if (code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: msg
                    })
                    .then(() => {
                        this.init()
                    })
                } else {
                     this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 解绑设备
        handleUnBindDevice () {
            this.$dialog.confirm({
                title: '提示',
                message: '确认解绑当前设备吗？'
            })
            .then(() => {
                dealUnbindDevice({ code: this.code })
                .then(res => {
                    if (res.code === 200) {
                        setTimeout(() => {
                            this.$dialog.alert({
                                title: '提示',
                                message: '解绑成功'
                            })
                            .then(() => {
                                this.$router.replace('/')
                            })
                        }, 500)
                    } else {
                        this.$toast(res.message)
                    }
                })
                .catch(() => {
                    this.$toast('异常错误')
                })
            })
        },
        // 改变用户信息
        changeDeviceInfo (value) {
            this.info = Object.assign(this.info, value)
        }
    }
}
</script>

<style lang="scss">
.device-info {
  min-height: 100vh;
  main {
    padding-top: 46px;
  }
}
</style>
