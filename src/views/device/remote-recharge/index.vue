<template>
  <div class="remote-charge">
    <van-nav-bar
      :title="`${code}远程充值`"
      left-text="返回"
      class="shadow position-fixed w-100"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <main>
      <div class="padding-y-3">
        <div
          class="d-flex justify-content-between padding-y-3 margin-x-3 margin-y-2 rounded bg-gray banner"
        >
          <div class="flex-1 d-flex flex-column align-items-center">
            <div
              class="margin-bottom-2 text-333 text-size-default font-weight-bold"
            >
              卡号
            </div>
            <div class="text-success text-size-default font-weight-bold">
              {{ card_id || '— —' }}
            </div>
          </div>
          <div class="flex-1 d-flex flex-column align-items-center">
            <div
              class="margin-bottom-2 text-333 text-size-default font-weight-bold"
            >
              余额
            </div>
            <div class="text-success text-size-default font-weight-bold">
              {{ typeof card_surp === 'number' ? card_surp.toFixed(2) : '— —' }}
            </div>
          </div>
        </div>
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
import selectTemp from '@/components/charge/select-temp'
import {
  remotechargechoose,
  queryOfflineCard,
  chargeCard
} from '@/require/device'
export default {
  data() {
    return {
      code: this.$route.params.code,
      card_id: '',
      card_surp: '',
      templateTimelist: [],
      selectTimeTempId: -1,
      hardversion: '04'
    }
  },
  components: {
    selectTemp
  },
  mounted() {
    this.init()
  },
  computed: {
    disabled() {
      return this.selectTimeTempId === -1
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
          openid,
          nowtime,
          devicenum,
          hardversion
        } = await remotechargechoose({ code: this.code })
        if (Number.parseInt(code) === 200) {
          this.hardversion = hardversion
          this.templateTimelist = templatelist
          const {
            code,
            res,
            card_id: cardId,
            card_surp: cardSurp
          } = await queryOfflineCard({ code: devicenum, openid, nowtime })
          if (Number.parseInt(code) === 200) {
            this.card_id = cardId
            this.card_surp = Number.parseFloat(cardSurp) / 10
          } else {
            this.alert(res)
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
    async remoteCharge() {
      const money = this.templateTimelist.find(
        item => item.id === this.selectTimeTempId
      ).money
      const { message } = await chargeCard({
        code: this.code,
        card_id: this.card_id,
        card_surp: money,
        card_ope: 1
      })
      this.alert(message).then(() => {
        this.init()
      })
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
