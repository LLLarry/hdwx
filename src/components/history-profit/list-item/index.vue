<template>
  <div class="list-item d-flex padding-y-2 margin-bottom-3">
    <div class="left d-flex align-items-center justify-content-center">
      <i class="iconfont icon-chongdianbao text-success" v-if="type === 1"></i>
      <i class="iconfont icon-xiaoqu text-success" v-else-if="type === 2"></i>
      <i class="iconfont icon-shijian text-success" v-else-if="type === 3"></i>
    </div>
    <div class="flex-1">
      <hd-card>
        <hd-card-item class="text-size-sm">
          <span
            class="text-000 font-weight-bold text-size-md math-num"
            v-if="type === 1"
            >{{ data.code }}</span
          >
          <span
            class="text-000 font-weight-bold text-size-md math-num"
            v-else-if="type === 2"
            >{{ data.name }}</span
          >
          <span
            class="text-000 font-weight-bold text-size-md math-num"
            v-else-if="type === 3"
            >{{ data.countTime }}</span
          >
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">营收总额：</span>
          <span class="text-success font-weight-bold text-size-default math-num"
            >&#165; {{ data.totalmoney | fmtMoney }}</span
          >
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">线上收益：</span>
          <span class="text-000 math-num">{{
            data.totalonearn | fmtMoney
          }}</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">消费金额：</span>
          <span class="text-000 math-num">{{
            data.consumemoney | fmtMoney
          }}</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">消耗电量：</span>
          <span class="text-000 math-num">{{
            data.consumequantity | fmtMoney
          }}</span>
        </hd-card-item>
      </hd-card>
    </div>
  </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
export default {
  props: {
    type: {
      type: Number, // 1 设备统计 2 小区统计 3 时间统计
      default: 3
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    hdCard,
    hdCardItem
  }
}
</script>

<style lang="scss">
.list-item {
  background: #f5f6fa;
  .left {
    width: 80px;
    i {
      font-size: 45px;
    }
  }
}
</style>
