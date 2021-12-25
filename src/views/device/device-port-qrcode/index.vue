<template>
  <div class="device-port-qrcode">
    <div class="header bg-primary">
      <div class="header-box d-flex flex-column align-items-center">
          <div class="header-device-code text-size-default margin-bottom-2">{{code}}设备端口二维码</div>
      </div>
    </div>
    <div class="main">
      <van-grid :column-num="3" v-if="qrList">
        <van-grid-item
          v-for="item in qrList"
          :key="item.port"
          @click="handleClick(item.qrcode)"
        >
            <template #default>
                <div>
                    <div class="qrcode padding-1" :ref="`qrcode-warpper-${qrcode.key}`" v-if="item.qrcode">
                        <div class="qr_c">
                            <qrcode
                                v-bind="item.qrcode"
                                :foreground="foreground"
                            />
                        </div>
                        <h3 v-if="item.qrcode.title" class="desc text-center text-size-sm text-000 font-weight-bold">{{item.qrcode.title}}</h3>
                    </div>
                </div>
            </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 设备二维码 -->
    <hd-overlay :show="isShow" :title="`设备${code}端口二维码`" @close="isShow = false">
      <div v-if="showDeviceQRcode">
        <hd-qrcode :qrcode="qrcode" />
        <p class="text-center text-size-sm text-666">长按识别或保存二维码</p>
      </div>
    </hd-overlay>
  </div>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
import hdQrcode from '@/components/hd-qrcode'
import { mapState } from 'vuex'
import { inquireDeviceMmanageInfo } from '@/require/device'
import { getInfoByHdVersion } from '@/utils/util'
const { PROXY_BASE_URL } = window.HDWX
export default {
  data () {
    return {
      code: this.$route.params.code,
      qrList: undefined,
      qrcode: {
          key: 1
      },
      result: {},
      isShow: false,
      showDeviceQRcode: false
    }
  },
  components: {
    hdOverlay,
    hdQrcode
  },
  mounted () {
      this.init()
  },
  computed: {
    ...mapState(['global']),
    // 缩略图二维码前景图
    foreground () {
      const { theme } = this.global
      return theme === 'dark' ? '#FFFFFF' : '#000000'
    }
  },
  watch: {
    // 监听设备二维码关闭的时候,延迟移除二维码
    isShow: {
      handler (flag) {
        if (flag) {
          this.showDeviceQRcode = true
        } else {
          setTimeout(() => {
            this.showDeviceQRcode = false
          }, 300)
        }
      },
      immediate: true
    }
  },
  methods: {
    async init () {
      try {
        const { code, message, ...result } = await inquireDeviceMmanageInfo({ code: this.code })
        if (code === 200) {
          this.result = result
          const { portNum, portPath, portKey } = getInfoByHdVersion(result.deviceversion)
          const arr = Array(portNum).fill(1).map((item, index) => ({ port: (index + 1) }))
          // this.qrList = arr
          // setTimeout(() => {
            this.qrList = arr.map(item => {
                return {
                    ...item,
                    qrcode: {
                        value: `${PROXY_BASE_URL}${portPath}?${portKey}=${this.code}${item.port}`,
                        key: item.port,
                        size: this.global.clientWidth * 0.23, // 二维码大小
                        title: `${this.code}-${item.port.toString().padStart(2, 0)}`
                    }
                }
            })
          // }, 500)
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    handleClick (qrcode) {
      this.qrcode = { ...qrcode, size: this.global.clientWidth * 0.59 }
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.device-port-qrcode {
  .header {
    min-height: 20vh;
    /* background-color: #4d95ff; */
    background-image: url('../../../assets/images/bottom_wave.png');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100%;
    .header-box {
      padding-top: 15%;
      color: rgba(255, 255, 255, .8);
    }
  }
  .main {
    .van-icon__image {
      width: 150px;
      height: 150px;
    }
  }
}
[theme="dark"] {
  .device-port-qrcode {
    .header {
       background-image: url('../../../assets/images/bottom_wave_dark.png');
    }
  }
}
</style>
