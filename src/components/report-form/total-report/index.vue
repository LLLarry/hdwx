<template>
  <div class="total-report">
    <div class="time-top padding-x-3 padding-y-2 margin-y-3">
      <h3>净利润（元）</h3>
      <div class="text-success font-weight-bold math-num total-money">
        100.00
      </div>
      <hd-card>
        <hd-card-item
          class="d-flex"
        >
          <span class="text-p text-size-sm">毛利润：</span>
          <span class="text-000 math-num">
            125.00
          </span>
          <van-popover
            v-model="showPopover"
            trigger="click"
            placement="top-start"
          >
            <div class="text-size-md padding-3" style="max-width: 60vw;">
              净利润 = 毛利润 - 设备折旧 - 运营成本！
            </div>
            <template #reference>
              <div>
                <van-icon
                  class="margin-left-1"
                  name="question-o"
                  size=".4rem"
                />
              </div>
            </template>
          </van-popover>
        </hd-card-item>

         <hd-card-item
          class="d-flex"
        >
          <span class="text-p text-size-sm">设备折旧：</span>
          <span class="text-000 math-num">
            13.00
          </span>
        </hd-card-item>

        <hd-card-item
          class="d-flex"
        >
          <span class="text-p text-size-sm">运营成本：</span>
          <span class="text-000 math-num">
            12.00
          </span>
        </hd-card-item>
      </hd-card>
    </div>

    <div>
      <hd-title exec>营收明细</hd-title>

      <list-item v-for="item in 10" :key="item" />
    </div>
  </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import ListItem from '@/components/report-form/list-item'
export default {
  components: {
    hdCard,
    hdCardItem,
    ListItem
  },
  data() {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss" scoped>
.total-report {
  .time-top {
    background: #f5f6fa;
    .total-money {
      font-size: 30px;
    }
  }
}
</style>
