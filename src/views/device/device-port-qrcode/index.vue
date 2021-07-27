<template>
  <div class="device-port-qrcode">
    <div class="header">
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
      <div v-if="isShow">
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
export default {
  data () {
    return {
      code: this.$route.params.code,
      list: [
        { title: '设备二维码', icon: require('../../../assets/images/home_05.png') },
        { title: '端口二维码', icon: require('../../../assets/images/home_05.png') },
        { title: '收费模板', icon: require('../../../assets/images/home_07.png') },
        { title: '系统参数', icon: require('../../../assets/images/device-system.png') },
        { title: '更换模块', icon: require('../../../assets/images/home_01.png') },
        { title: '断开重连', icon: require('../../../assets/images/home_09.png') }
      ],
      qrList: undefined,
      qrcode: {
          key: 1
      },
      isShow: false
    }
  },
  components: {
    hdOverlay,
    hdQrcode
  },
  mounted () {
      const arr = Array(20).fill(1).map((item, index) => ({ port: (index + 1) }))
      this.qrList = arr
      setTimeout(() => {
        this.qrList = this.qrList.map(item => {
            return {
                ...item,
                qrcode: {
                    value: '9965465465sadsaswwwaad',
                    key: item.port,
                    size: this.global.clientWidth * 0.23, // 二维码大小
                    title: `${this.code}-${item.port.toString().padStart(2, 0)}`
                }
            }
        })
      }, 500)
  },
  computed: {
    ...mapState(['global'])
  },
  methods: {
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
    background-color: #4d95ff;
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
</style>
