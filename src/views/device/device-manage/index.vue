<template>
  <div class="device-manage">
    <div class="header bg-primary">
      <div class="header-box d-flex flex-column align-items-center">
          <div class="header-device-code text-size-default margin-bottom-2">{{code}}</div>
          <div class="d-flex align-items-center">
            <span class="margin-right-1" v-if="result.devicename">{{result.devicename}}</span>
          </div>
      </div>
    </div>
    <div class="main">
      <div
        class="d-flex justify-content-center align-items-center padding-y-4"
        v-if="loading"
      >
        <van-loading color="#1989fa" size="1.5rem" />
      </div>
      <van-grid :column-num="3" v-else>
        <van-grid-item
          v-for="item in list"
          :key="item.title"
          :icon="item.icon"
          :text="item.title"
          @click="handleClick(item.title)"
        />
      </van-grid>
    </div>
    <!-- 设备二维码 -->
    <hd-overlay :show="deviceQRcode" title="设备二维码" @close="deviceQRcode = false">
      <div>
        <hd-qrcode :qrcode="qrcode" v-if="showDeviceQRcode" />
        <p class="text-center text-size-sm text-666">长按识别或保存二维码</p>
      </div>
    </hd-overlay>

    <!-- 更换模块 -->
    <hd-overlay :show="changeModel" title="更换模块" @close="changeModel = false">
      <div class="text-center text-size-sm">
        此功能用于更换2G或者4G模块后，可以不用更换主机和插座二维码。
      </div>
      <h5 class="text-center text-size-sm margin-top-3 margin-bottom-2">
        更换步骤
      </h5>
      <ul class="text-size-sm">
        <li class="margin-bottom-1"><p>1、将设备断电</p></li>
        <li class="margin-bottom-1"><p>2、扫新模块二维码，并互换模块IMEI号</p></li>
        <li class="margin-bottom-1"><p>3、拆掉老模块、装上新模块</p></li>
        <li class="margin-bottom-1"><p>4、设备通电</p></li>
      </ul>
      <van-button type="info"  size="small" class="w-100 margin-top-2" @click="changeModelFn">
        <van-icon name="scan" size="16px"/>
        <span class="position-relative margin-left-1" style="top: -3px;">扫码更换</span>
      </van-button>
    </hd-overlay>

    <!-- 断开重连 -->
    <hd-overlay :show="disconnect" title="断开重连" @close="disconnect = false">
      <div class="text-center text-size-sm margin-bottom-2">
        此功能用于设备显示状态与实际不符的情况，例如：
      </div>
      <ul class="text-size-sm">
        <li class="margin-bottom-1"><p>1、设备状态为“在线”，用户支付完之后机器无响应，无法正常下发充电指令</p></li>
        <li class="margin-bottom-1"><p>2、设备状态为“在线”，用户进入充电页面后显示“请检查设备是否在线”</p></li>
      </ul>

      <div class="text-size-sm margin-top-2 font-weight-bold">
        当设备满足上面任意一种情况时，需要商户手动点击“断开重连”按钮，更新设备的最新状态；
      </div>
      <van-button type="info"  size="small" class="w-100 margin-top-2" @click="disconnectFn">
        断开重连
      </van-button>
    </hd-overlay>

    <hd-overlay :show="changeResult" title="IMEI号互换结果" @close="changeResult = false">
        <div class="text-center text-size-sm margin-bottom-2">
            IMEI号互换结果
        </div>
        <ul class="text-size-md repeat-box">
            <li class="margin-bottom-1 d-flex align-items-center border-bottom-1 border-ccc padding-bottom-3 margin-bottom-3">
                <p class="flex-1 text-center font-weight-bold">{{changeResultMap.code1}}</p>
                <div class="flex-1 text-center">
                  <p>{{changeResultMap.oldCode1}}</p>
                  <van-icon name="exchange" size=".5rem"  class="text-primary" />
                  <p>{{changeResultMap.newCode1}}</p>
                </div>
            </li>

            <li class="margin-bottom-1 d-flex align-items-center">
                <p class="flex-1 text-center font-weight-bold">{{changeResultMap.code2}}</p>
                <div class="flex-1 text-center">
                  <p>{{changeResultMap.oldCode2}}</p>
                  <van-icon name="exchange" size=".5rem"  class="text-primary" />
                  <p>{{changeResultMap.newCode2}}</p>
                </div>
            </li>
        </ul>
    </hd-overlay>
  </div>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
import hdQrcode from '@/components/hd-qrcode'
import { mapState } from 'vuex'
import { inquireDeviceMmanageInfo, merTranspositionImei, removeClient } from '@/require/device'
import { getInfoByHdVersion, getVersion } from '@/utils/util'
import { scanQRCode } from '@/utils/wechat-util'
import parseURL from '@/utils/parse-url'
const { PROXY_BASE_URL } = window.HDWX
export default {
  data () {
    return {
      code: this.$route.params.code,
      list: [
        { title: '设备二维码', icon: require('../../../assets/images/home_05.png') }, // 蓝牙设备不显示
        { title: '端口二维码', icon: require('../../../assets/images/home_05.png') }, // 蓝牙设备不显示
        { title: '收费模板', icon: require('../../../assets/images/home_07.png') },
        { title: '系统参数', icon: require('../../../assets/images/device-system.png') }, // 蓝牙设备不显示
        { title: '更换模块', icon: require('../../../assets/images/home_01.png') },
        { title: '断开重连', icon: require('../../../assets/images/delete_icon.png') },
        { title: '设备详情', icon: require('../../../assets/images/home_09.png') },
        { title: '报警系统', icon: require('../../../assets/images/监控.png') },
        { title: '信道操作', icon: require('../../../assets/images/信道.png') }
        // 报警系统 08时显示
      ],
      loading: false,
      changeModel: false, // 更换模块
      disconnect: false,
      deviceQRcode: false, // 设备二维码弹框
      showDeviceQRcode: false, // 显示设备二维码
      qrcode: {
        value: '',
        key: 1,
        size: 220, // 二维码大小
        title: `设备：${this.$route.params.code}`
      },
      result: {}, // 设备信息
      changeResult: false, // 互换IMEI号结果是否显示
      changeResultMap: {}
    }
  },
  components: {
    hdOverlay,
    hdQrcode
  },
  computed: {
    ...mapState(['global'])
  },
  watch: {
    // 监听设备二维码关闭的时候,延迟移除二维码
    deviceQRcode: {
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
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      try {
        this.loading = true
        const { code, message, ...result } = await inquireDeviceMmanageInfo({ code: this.code })
        if (code === 200) {
          this.result = result
          if (result.deviceType === 2) {
            this.list = this.list.filter(item => !['设备二维码', '端口二维码', '系统参数', '信道操作'].includes(item.title))
          } else if (['00', '01', '02', '03', '04', '05', '06', '07', '12'].includes(result.deviceversion)) {
            if (['04'].includes(result.deviceversion)) {
              this.list = this.list.filter(item => !['报警系统', '信道操作', '端口二维码', '系统参数'].includes(item.title))
            } else {
              this.list = this.list.filter(item => !['报警系统', '信道操作'].includes(item.title))
            }
          } else if (['08', '09', '10'].includes(result.deviceversion)) {
            this.list = this.list.filter(item => !['信道操作'].includes(item.title))
          } else if (['11'].includes(result.deviceversion)) {
            this.list = this.list.filter(item => !['系统参数'].includes(item.title))
          }
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      } finally {
        this.loading = false
      }
    },
    handleClick (title) {
      switch (title) {
        case '设备二维码': this.createDeviceQRcode(); break
        case '端口二维码':
          this.$router.push({ path: '/device/portqrcode/' + this.code })
        break
        case '收费模板':
          this.$router.push({ path: '/device/templatelist/' + this.code })
        break
        case '系统参数':
          this.$router.push({ path: `/device/system/${getVersion(this.result.deviceversion) === 'v2-car' ? 'car' : 'v2'}/` + this.code })
        break
        case '更换模块':
          this.changeModel = true
          break
        case '断开重连':
          this.disconnect = true
          break
        case '设备详情':
          this.$router.push({ path: '/device/info/' + this.code })
          break
        case '报警系统':
          this.$router.push({ path: '/device/alarm/' + this.code })
          break
         case '信道操作':
          this.$router.push({ path: '/device/channelvale/' + this.code })
          break
      }
    },
    // 创建端口二维码
    createDeviceQRcode () {
      if (this.result.deviceType === 1) { // 联网设备
        const { path, key } = getInfoByHdVersion(this.result.deviceversion)
        this.qrcode = {
          value: `${PROXY_BASE_URL}${path}?${key}=${this.code}`,
          key: new Date().getTime(),
          size: this.global.clientWidth * 0.6, // 二维码大小
          title: `设备：${this.code}`
        }
        this.deviceQRcode = true
      } else { // 蓝牙设备
        this.qrcode = {
          value: `https://www.tengfuchong.cn/applet/${this.code}`,
          key: new Date().getTime(),
          size: this.global.clientWidth * 0.6, // 二维码大小
          title: `设备：${this.code}`
        }
        this.deviceQRcode = true
      }
    },
    // 更换IMEI号
    changeModelFn () {
      scanQRCode()
      .then(res => {
          const { status, message, ...result } = parseURL(res)
          if (status !== 200) return this.$toast(message)
          if (!result.code) return this.$toast('请扫描设备的二维码')
          merTranspositionImei({
            code1: this.code,
            code2: result.code
          })
          .then(res => {
            if (res.code === 200) {
              this.changeResultMap = Object.assign({
                code1: this.code,
                code2: result.code
              }, res.result)
              this.changeResult = true
              this.$toast('IMEI号更换成功')
            } else {
              this.$toast(res.message)
            }
          })
          .catch(() => {
            this.$toast('异常错误')
          })
      })
    },
    // 断开重连
    disconnectFn () {
      this.$dialog.confirm({
        title: '提示',
        message: '确定断开重连吗？'
      })
      .then(() => {
          removeClient({
            code: this.code
          })
          .then(res => {
            if (res.code === 200) {
              this.$toast('设备已断开，稍后会自动进行重连')
            } else {
              this.$toast(res.message)
            }
          })
          .catch(() => {
            this.$toast('异常错误')
          })
      })
    }
  }
}
</script>

<style lang="scss">
.device-manage {
  .header {
    min-height: 30vh;
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
      width: 45px;
      height: 45px;
    }
  }
}
[theme="dark"] {
  .device-manage  {
    .header {
      background-image: url('../../../assets/images/bottom_wave_dark.png');
    }
  }
}
</style>
