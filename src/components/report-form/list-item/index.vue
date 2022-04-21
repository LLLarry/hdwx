<template>
  <div class="list-item d-flex padding-y-2 margin-bottom-3">
    <div class="left d-flex align-items-center justify-content-center">
      <i class="iconfont icon-shijian text-success"></i>
    </div>
    <div class="flex-1">
      <hd-card>
        <hd-card-item class="text-size-sm">
          <span
            class="text-000 font-weight-bold text-size-md math-num"
            >2022-03-17</span
          >
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">营收毛利：</span>
          <span class="text-success font-weight-bold text-size-default math-num"
            >&#165; 32.21</span
          >
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">线上收益：</span>
          <span class="text-000 math-num">20.63</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">投币收益：</span>
          <span class="text-000 math-num">5</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">消费金额：</span>
          <span class="text-000 math-num">5.00</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">消耗电量：</span>
          <span class="text-000 math-num">6.9度</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">电费：</span>
          <span class="text-000 math-num">4.00</span>
        </hd-card-item>
        <hd-card-item class="text-size-sm">
          <span class="text-p">使用率：</span>
          <span class="text-000 math-num">32%</span>
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
