<template>
  <div class="time-statis">
    <div class="time-top padding-x-3 padding-y-2">
      <h3>营收总额（元）</h3>
      <div class="text-success font-weight-bold math-num total-money">
        {{ gather.total | fmtMoney }}
      </div>
      <hd-card>
        <hd-card-item
          class="d-flex"
          v-for="item in gather.list"
          :key="item.title"
          v-hd-incoins="item.title === '投币收益'"
        >
          <span class="text-p text-size-sm">{{ item.title }}：</span>
          <span class="text-000 math-num">
            {{ item.value | fmtMoney(item.decimal) }}
          </span>
          <van-popover
            v-model="showPopover"
            trigger="click"
            placement="top-start"
            v-if="item.title === '耗电量'"
          >
            <div class="text-size-md padding-3" style="max-width: 60vw;">
              耗电量根据主板数据汇总，仅供参考，依实际为准。耗电量(包含扫码,投币,刷卡)开始统计时间为2019年9月1日！
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
      </hd-card>
    </div>

    <div>
      <hd-title exec>营收明细</hd-title>
      <list-item
        :type="3"
        v-for="item in resultlist"
        :key="item.countTime"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import ListItem from '@/components/history-profit/list-item'
export default {
  props: {
    resultTotal: {
      type: Object
    },
    resultlist: {
      type: Array
    }
  },
  components: {
    hdCard,
    hdCardItem,
    ListItem
  },
  computed: {
    gather() {
      if (this.resultTotal) {
        const {
          totalmoney,
          totalonearn,
          totalcoinsearn,
          totaloncardmoney,
          totalconsumemoney,
          totalconsumequantity
        } = this.resultTotal
        return {
          total: totalmoney,
          list: [
            { title: '线上收益', value: totalonearn, decimal: 2 },
            { title: '投币收益', value: totalcoinsearn, decimal: 0 },
            { title: '刷卡收益', value: totaloncardmoney, decimal: 2 },
            { title: '消费金额', value: totalconsumemoney, decimal: 2 },
            { title: '耗电量', value: totalconsumequantity, decimal: 2 }
          ]
        }
      } else {
        return {
          total: 0,
          list: [
            { title: '线上收益', value: 0, decimal: 2 },
            { title: '投币收益', value: 0, decimal: 0 },
            { title: '刷卡收益', value: 0, decimal: 2 },
            { title: '消费金额', value: 0, decimal: 2 },
            { title: '耗电量', value: 0, decimal: 2 }
          ]
        }
      }
    }
  },
  data() {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss">
.time-statis {
  .time-top {
    background: #f5f6fa;
    .total-money {
      font-size: 30px;
    }
  }
}
</style>
