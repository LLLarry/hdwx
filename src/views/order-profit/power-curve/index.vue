<template>
  <div class="power-curve bg-gray">
    <van-nav-bar
      title="功率曲线"
      left-text="返回"
      left-arrow
      right-text="123"
      @click-left="$router.go(-1)"
      class="shadow position-fixed w-100 fixed-header"
    >
      <template #right>
        <van-icon
          :name="hiddenPower ? 'eye-o' : 'closed-eye'"
          size=".5rem"
          @click="hiddenPower = !hiddenPower"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="power-post padding-3">
        <div
          class="d-flex justify-content-between border-1 rounded-md padding-3 text-666"
          style="border-color: #add9c0; background: rgba(255, 255, 255, .5);"
        >
          <div
            class="flex-1 d-flex justify-content-between flex-column align-items-center"
          >
            <span class="margin-bottom-2">已充时长</span>
            <span class="font-weight-bold text-size-default">{{
              useTime
            }}</span>
          </div>
          <div
            class="flex-1 d-flex justify-content-between flex-column align-items-center"
            v-if="!hiddenPower"
          >
            <span class="margin-bottom-2 position-relative">
              消耗电量
              <!-- <van-icon name="closed-eye" size=".5rem" class="text-primary position-absolute margin-left-1" @click="hiddenPower=true" /> -->
            </span>
            <span class="font-weight-bold text-size-default">{{
              useElec
            }}</span>
          </div>
        </div>
      </div>

      <div class="power-post padding-x-3">
        <hd-card
          class="border-1 rounded-md padding-x-3 padding-y-2  text-999 text-size-sm"
          style="border-color: #add9c0; background: rgba(255, 255, 255, .5);"
        >
          <hd-card-item class="w-100">
            <span class="text-333 font-weight-bold text-size-md"
              >已用信息：</span
            >
          </hd-card-item>
          <hd-card-item>
            <span>设备编号：</span>
            <span class="text-333">{{ result.devicenum }}</span>
          </hd-card-item>
          <hd-card-item v-if="result.addr">
            <span>从机地址：</span>
            <span class="text-333">{{ result.addr }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>充电端口：</span>
            <span class="text-333">{{ result.port }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>设备名称：</span>
            <span class="text-333">{{
              result.devicename ? result.devicename : '— —'
            }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>小区名称：</span>
            <span class="text-333">{{
              result.areaname ? result.areaname : '— —'
            }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>付款金额：</span>
            <span class="text-333 d-inline-flex align-items-center"
              >&yen;
              <span>{{ result.paymoney | fmtMoney }}</span>
              <van-popover v-model="showPopover" trigger="click">
                <div
                  class="padding-3 rounded-md bg-white text-size-sm"
                  style="width: 50vw"
                >
                  <p class="margin-bottom-1">1、当前订单为“按时间充电”订单</p>
                  <p class="margin-bottom-1">
                    2、在订单结束充电之前，会显示付款金额为0.00是正常现象
                  </p>
                  <p>3、当充电结束后会显示付款金额</p>
                </div>
                <template #reference>
                  <van-icon
                    name="question-o"
                    size=".4rem"
                    class="text-primary margin-left-1"
                    v-if="result.advance === 2"
                  />
                </template>
              </van-popover>
            </span>
          </hd-card-item>
          <hd-card-item>
            <span>退费金额：</span>
            <span
              class="text-333"
              v-if="result.number === 1 && result.refundmoney === 0"
              >&yen;{{ result.paymoney | fmtMoney }}</span
            >
            <span class="text-333" v-else>&yen;{{ refMoney }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>最大功率：</span>
            <span class="text-333">{{ result.maxpower }}瓦</span>
          </hd-card-item>
          <hd-card-item>
            <span>支付方式：</span>
            <span class="text-333">{{
              result.paytype == 1
                ? '钱包'
                : result.paytype == 2
                ? '微信'
                : result.paytype == 3
                ? '支付宝'
                : result.paytype == 4
                ? '包月下发数据'
                : result.paytype == 5
                ? '投币'
                : result.paytype == 6
                ? '离线卡'
                : result.paytype == 7
                ? '在线卡'
                : result.paytype == 8
                ? '支付宝小程序'
                : result.paytype == 12
                ? '银联'
                : '— —'
            }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>结束原因：</span>
            <span class="text-333">{{
              result.resultinfo == 0
                ? ' 充电完成'
                : result.resultinfo == 1
                ? '空载断电'
                : result.resultinfo == 2
                ? '充满'
                : result.resultinfo == 3
                ? '超功率自停'
                : result.resultinfo == 4
                ? '远程断电'
                : result.resultinfo == 5
                ? '刷卡断电'
                : result.resultinfo == 6
                ? '设备离线'
                : result.resultinfo == 7
                ? '余额不足'
                : result.resultinfo == 11
                ? '充电完成°'
                : result.resultinfo == 255
                ? '日志结束'
                : '无'
            }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>订单编号：</span>
            <span class="text-333">{{ result.ordernum }}</span>
          </hd-card-item>
          <hd-card-item>
            <span>开始时间：</span>
            <span class="text-333" v-if="result.begintime">{{
              result.begintime | fmtDate
            }}</span>
            <span class="text-333" v-else>— —</span>
          </hd-card-item>
          <hd-card-item>
            <span>结束时间：</span>
            <span class="text-333" v-if="result.endtime">{{
              result.endtime | fmtDate
            }}</span>
            <span class="text-333" v-else>— —</span>
          </hd-card-item>
        </hd-card>
      </div>

      <div class="power-post padding-x-1 margin-y-3">
        <div class="chart" ref="chart"></div>
      </div>

      <div class="power-post padding-bottom-4">
        <div>
          <van-sticky offset-top="1.2266666666666666rem">
            <van-row
              class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold"
            >
              <van-col
                :span="spanNum + 1"
                class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                >记录时间</van-col
              >
              <van-col
                :span="spanNum"
                class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                >剩余时间</van-col
              >
              <van-col
                :span="spanNum"
                class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                >功率</van-col
              >
              <van-col
                :span="spanNum - 1"
                class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                >电量</van-col
              >
              <van-col
                :span="spanNum"
                class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                v-if="showAV"
                >实时电压/电流</van-col
              >
              <van-col
                :span="spanNum"
                class="padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                v-if="showConsumemoney"
                >费用</van-col
              >
            </van-row>
          </van-sticky>
          <van-row
            class="d-flex post-border-row margin-x-3 text-size-sm text-666"
            v-for="item in powerTableList"
            :key="item.id"
          >
            <van-col
              :span="spanNum + 1"
              class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              >{{ item.createtime | fmtDate }}</van-col
            >
            <van-col
              :span="spanNum"
              class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              >{{ item.chargetime }}分钟</van-col
            >
            <van-col
              :span="spanNum"
              class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              >{{ item.power }}瓦</van-col
            >
            <van-col
              :span="spanNum - 1"
              class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              >{{ item.surpluselec / 100 }}度</van-col
            >
            <van-col
              :span="spanNum"
              class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              v-if="showAV"
            >
              <div>
                {{ item.portV == -1 ? '— —' : `${item.portV}V` }}
              </div>
              <div>
                {{ item.portA == -1 ? '— —' : `${item.portA}A` }}
              </div>
            </van-col>
            <van-col
              :span="spanNum"
              class="padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
              v-if="showConsumemoney"
              >{{ item.money | fmtMoney }}元</van-col
            >
          </van-row>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import { powerbrokenline, powerdrawing } from '@/require/order-profit'
// import { getVersion } from '@/utils/util'
export default {
  components: {
    HdCard,
    HdCardItem
  },
  data() {
    return {
      id: '', // 订单id
      myChart: null, // myChart实例对象
      powerList: [], // 功率曲线
      powerTableList: [], // 功率表格
      result: {},
      hiddenPower: false, // 异常电量
      showPopover: false
    }
  },
  async mounted() {
    const echarts = await import('echarts')
    this.myChart = echarts.init(this.$refs.chart)
    this.myChart.showLoading({ text: '加载中...' })
    // 订单id
    this.id = this.$route.params.id
    this.init()
    this.initDraw()
  },
  computed: {
    // 是否显示电流电压
    showAV() {
      if (!Array.isArray(this.powerTableList)) return false
      const item = this.powerTableList[0]
      if (item) {
        return item.portV !== -1 && item.portA !== -1
      }
      return false
    },
    spanNum() {
      let num = 3
      if (this.showAV) {
        num++
      }
      if (this.showConsumemoney) {
        num++
      }
      return 24 / num
    },
    // 使用时间
    useTime() {
      const { usetime } = this.result
      if (typeof usetime === 'number') {
        const h = Math.floor(usetime / 60)
        const mi = usetime % 60
        return `${h}小时${mi}分钟`
      } else {
        return '— —'
      }
    },
    // 使用时间
    useElec() {
      const { useelec } = this.result
      if (typeof useelec === 'number') {
        const d = (useelec / 100).toFixed(2)
        return `${d}度`
      } else {
        return '— —'
      }
    },
    // 退费金额
    refMoney() {
      const { endtime, refundmoney = 0 } = this.result
      if (endtime) {
        return refundmoney.toFixed(2)
      } else {
        return ' — —'
      }
    },
    // 是否显示扣费金额（v3版本显示）
    showConsumemoney() {
      const item = this.powerTableList[1] || this.powerTableList[0]
      if (typeof item === 'undefined') {
        return false
      } else {
        if (item.money === null || item.money === -1) {
          return false
        }
        return true
      }
    }
  },
  methods: {
    async init() {
      try {
        const { code, message, realrecord, ...result } = await powerbrokenline({
          orderId: this.id
        })
        if (code === 200) {
          this.powerTableList = realrecord
          this.result = result
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    // 获取功率曲线图像数据
    async initDraw() {
      try {
        const { code, drawinglist, message } = await powerdrawing({
          orderId: this.id
        })
        if (code === 200) {
          this.powerList = drawinglist
          this.initEChart()
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      } finally {
        this.myChart.hideLoading()
      }
    },
    // 初始化echart
    async initEChart() {
      this.myChart.setOption(this.getOptions(this.powerList))
    },
    // 获取echart配置
    getOptions(list = []) {
      const names = []
      const nums = [] // 功率list
      const listV = [] // 电压list
      const listA = [] // 电流list

      for (let i = 0; i < list.length; i++) {
        names.push(list[i].minuteTime)
        nums.push(list[i].power)
        listV.push(list[i].portV)
        listA.push(list[i].portA)
      }
      let yAxis = []
      let series = []
      if (listV[0] === -1 || listA[0] === -1) {
        yAxis = [
          {
            name: '功率 W',
            type: 'value',
            axisLabel: { color: '#666' },
            axisLine: {
              show: true,
              lineStyle: { color: '#666' }
            },
            axisTick: {
              lineStyle: { color: '#666' }
            }
          }
        ]

        series = [
          {
            name: '功率',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                color: '#6BD089',
                width: 2
              }
            },
            itemStyle: {
              // 拐点样式
              color: '#6BD089'
            },
            data: nums
          }
        ]
      } else {
        yAxis = [
          {
            name: '功率 W',
            type: 'value',
            axisLabel: { color: '#666' },
            axisLine: { show: true, lineStyle: { color: '#666' } },
            axisTick: { lineStyle: { color: '#666' } }
          },
          {
            type: 'value',
            name: '电压/ 电流',
            axisLabel: {
              formatter: function(value, index) {
                if (index > 0) {
                  return value + 'V'
                } else {
                  return ''
                }
              },
              inside: true,
              textStyle: {
                color: '#007AAE'
              }
            },
            axisLine: { show: true, lineStyle: { color: '#666' } },
            axisTick: { lineStyle: { color: '#666' } }
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function(value, index) {
                if (index > 0) {
                  return value + 'A'
                } else {
                  return ''
                }
              },
              inside: true,
              textStyle: {
                color: '#B21016'
              }
            },
            axisLine: { show: true, lineStyle: { color: '#666' } },
            axisTick: { lineStyle: { color: '#666' } }
          }
        ]

        series = [
          {
            name: '功率',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                color: '#6BD089',
                width: 2
              }
            },
            itemStyle: {
              // 拐点样式
              color: '#6BD089'
            },
            data: nums
          },
          {
            name: '电压',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                color: '#007AAE',
                width: 2
              }
            },
            itemStyle: {
              // 拐点样式
              color: '#007AAE'
            },
            data: listV
          },
          {
            name: '电流',
            type: 'line',
            smooth: true,
            yAxisIndex: 2,
            lineStyle: {
              normal: {
                color: '#B21016',
                width: 2
              }
            },
            itemStyle: {
              // 拐点样式
              color: '#B21016'
            },
            data: listA
          }
        ]
      }

      return {
        grid: {
          left: '5%',
          right: '10%',
          bottom: '3%',
          top: '17%',
          containLabel: true,
          show: false
        },
        tooltip: { trigger: 'axis' },
        legend: { data: ['功率', '电压', '电流'] },
        xAxis: {
          name: '分钟',
          nameGap: 5,
          axisLabel: { color: '#666' }, // x轴字体颜色
          axisLine: { show: true, lineStyle: { color: '#666' } }, // x轴坐标轴颜色
          axisTick: { lineStyle: { color: '#666' } }, // x轴刻度的颜色
          data: names
        },
        yAxis,
        series
      }
    }
  }
}
</script>

<style lang="scss">
.power-curve {
  min-height: 100vh;
  .fixed-header {
    top: 0;
    left: 0;
  }
  main {
    padding-top: 46px;
    .chart {
      height: 260px;
    }
    .post-border-row {
      &.post-header {
        background-color: #c8efd4;
      }
      border: 1px solid #add9c0;
      .post-border-col {
        border-right: 1px solid #add9c0;
      }
    }
  }
}
</style>
