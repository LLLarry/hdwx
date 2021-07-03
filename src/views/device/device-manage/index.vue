<template>
  <div class="device-manage">
    <div class="header">
      <div class="header-box d-flex flex-column align-items-center">
          <div class="header-device-code text-size-default margin-bottom-2">{{code}}</div>
          <div class="d-flex align-items-center">
            <span class="margin-right-1">测试小区</span>
            <van-icon name="edit" size="18px"/>
          </div>
      </div>
    </div>
    <div class="main">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="item in list"
          :key="item.title"
          :icon="item.icon"
          :text="item.title"
          @click="handleClick(item.title)"
        />
      </van-grid>
    </div>
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
      <van-button type="info"  size="small" class="w-100 margin-top-2">
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
      <van-button type="info"  size="small" class="w-100 margin-top-2">
        断开重连
      </van-button>
    </hd-overlay>
  </div>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
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
      changeModel: false, // 更换模块
      disconnect: false
    }
  },
  components: {
    hdOverlay
  },
  methods: {
    handleClick (title) {
      switch (title) {
        case '设备二维码': break
        case '端口二维码': break
        case '收费模板': break
        case '系统参数': break
        case '更换模块':
          this.changeModel = true
        break
        case '断开重连':
          this.disconnect = true
        break
      }
    }
  }
}
</script>

<style lang="scss">
.device-manage {
  .header {
    min-height: 30vh;
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
      width: 45px;
      height: 45px;
    }
  }
}
</style>
