<template>
  <div class="remote-charge">
    <van-nav-bar
      :title="`${code}远程充电`"
      left-text="返回"
      class="shadow position-fixed w-100"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <main>
      <div class="padding-y-3">
        <select-port
          v-if="hardversion !== '03'"
          :list="list"
          :selectPort="selectPort"
          @selectPortBack="selectPortBack"
        />
        <hd-line v-if="hardversion !== '03'" />
        <div class="padding-3">
          <div class="margin-bottom-2 text-size-default">请选择充电模板</div>
          <select-temp
            :list="templateTimelist"
            :selectId="selectTimeTempId"
            type="time"
            @selectChargeTemp="selectChargeTemp"
          />
        </div>
        <hd-line />
        <div class="padding-3">
          <van-button
            block
            type="primary"
            :disabled="disabled"
            @click="remoteCharge"
            >远程下发充电</van-button
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import selectPort from '@/components/charge/select-port'
import selectTemp from '@/components/charge/select-temp'
import {
  remotechargechoose,
  remotechargeaccess,
  remoteChargingIncoins
} from '@/require/device'
import { getInfoByHdVersion } from '@/utils/util'
import { updatePortStatusHook } from '@/views/device/utils/helper.js'
export default {
  data() {
    return {
      code: this.$route.params.code,
      addr: this.$route.query.addr,
      list: [],
      selectPort: -1, // 选中的端口号
      templateTimelist: [],
      selectTimeTempId: -1,
      hardversion: '00'
    }
  },
  components: {
    selectPort,
    selectTemp
  },
  mounted() {
    this.init()
  },
  computed: {
    disabled() {
      if (this.hardversion !== '03') {
        return !(this.selectPort !== -1 && this.selectTimeTempId !== -1)
      } else {
        return this.selectTimeTempId === -1
      }
    }
  },
  methods: {
    async init() {
      try {
        // 获取设备信息
        const {
          code,
          message,
          templatelist,
          hardversion
        } = await remotechargechoose({ code: this.code, addr: this.addr })
        if (code === 200) {
          this.hardversion = hardversion
          const { portNum = 0 } = getInfoByHdVersion(hardversion)
          this.list = new Array(portNum)
            .fill(1)
            .map((item, index) => ({ port: index + 1, portStatus: 1 }))
          this.templateTimelist = templatelist
          try {
            if (hardversion === '03') return
            // 更新端口状态信息
            const map = await updatePortStatusHook({
              code: this.code,
              addr: this.addr
            })
            this.list = this.list.map(item => ({
              ...item,
              portStatus:
                map[item.port] < -1 || typeof map[item.port] === 'undefined'
                  ? 1
                  : map[item.port]
            }))
          } catch (e) {
            this.$toast(e)
          }
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    selectChargeTemp(row) {
      this.selectTimeTempId = row.id
    },
    selectPortBack(row) {
      this.selectPort = row.port
    },
    // 下发远程充电
    remoteCharge() {
      if (this.hardversion === '03') {
        this.inconsRemoteCharge()
      } else {
        this.basicsRemoteCharge()
      }
    },
    // 基础远程充电
    async basicsRemoteCharge() {
      try {
        const { code, message } = await remotechargeaccess({
          code: this.code,
          portchoose: this.selectPort,
          tempsonid: this.selectTimeTempId,
          addr: this.addr
        })
        if (code === 200) {
          this.$dialog.alert({
            title: '提示',
            message: '远程充电下发成功'
          })
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    // 投币远程充电
    async inconsRemoteCharge() {
      try {
        const item = this.templateTimelist.find(
          item => item.id === this.selectTimeTempId
        )
        const money = item.money
        await remoteChargingIncoins({
          code: this.code,
          money
        })
        this.$toast('远程下发成功')
      } catch (error) {
        console.log(error, this.templateTimelist, this.selectTimeTempId)
        this.$toast('异常错误')
      }
    }
  }
}
</script>

<style lang="scss">
.remote-charge {
  min-height: 100vh;
  main {
    padding-top: 46px;
  }
}
</style>
