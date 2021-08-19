<template>
    <div class="device-statis">
        <hd-title exec>功能开关</hd-title>
        <section>
          <div class="chart" ref="chart"></div>
        </section>
    </div>
</template>

<script>
// import VChart, { THEME_KEY } from 'vue-echarts'
// import { ref, defineComponent, onBeforeMount } from '@vue/composition-api'
export default {
  name: 'device-statis',
  data () {
    return {
      myChart: null
    }
  },
  components: {},
  mounted () {
    this.init(this.$refs.chart)
  },
  methods: {
    async init (dom) {
      const echarts = await import('echarts')
      this.myChart = echarts.init(dom)
      this.myChart.setOption(this.getOptions())
    },
    getOptions () {
      return {
            // backgroundColor: '#090909',
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                }
            ]
        }
    }
  }
}
</script>
<style lang="scss">
.device-statis {
    .chart {
        height: 200px;
    }
}
</style>
