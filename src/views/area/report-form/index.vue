<template>
  <div class="report-form">
    <hd-select-time
        :begintime="selectTime"
        ref="hdSelectTime"
        @handleSetTime="handleSetTime"
        class="hd-select-time"
        selectType="datetimePicker"
    />
    <total-report />
  </div>
</template>

<script>
import HdSelectTime from '@/components/hd-select-time'
import TotalReport from '@/components/report-form/total-report'

import { getMonthRange } from '@/utils/util'
export default {
  components: {
    HdSelectTime,
    TotalReport
  },
  data () {
    const initDate = getMonthRange(new Date(), 0, 'YYYY-MM')[0]
    console.log(initDate)
    return {
      selectTime: initDate
    }
  },
  methods: {
    handleSetTime (time) {
      this.selectTime = time
    }
  }
}
</script>

<style lang="scss" scoped>
.report-form {
  min-height: 100vh;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: #EFEEF3;
  .hd-select-time {
    background: #fff !important;
    margin-top: 0 !important;
    padding: 15px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
