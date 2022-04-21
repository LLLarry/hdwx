<template>
  <ul class="d-flex justify-content-between align-items-center time-contral margin-top-3">
        <li class="position-relative padding-x-1 d-flex align-items-center">
            <van-icon name="play" class="play-rotate" size="0.48rem" />
            <span class="margin-left-1" v-if="type==='week'" @click="selectTime('week', -1)">前一周</span>
            <span class="margin-left-1" v-else-if="type==='month'" @click="selectTime('month', -1)">前一月</span>
            <span class="margin-left-1" v-else @click="selectTime('today', -1)">前一天</span>
        </li>
        <li class="position-relative padding-x-1 d-flex align-items-center font-weight-bold" @click="showCalendar = true">
            {{timeText}}
        </li>
        <li class="position-relative padding-x-1 d-flex align-items-center">
            <span class="margin-right-1" v-if="type==='week'" @click="selectTime('week', 1)">后一周</span>
            <span class="margin-right-1" v-else-if="type==='month'" @click="selectTime('month', 1)">后一月</span>
            <span class="margin-right-1" v-else @click="selectTime('today', 1)">后一天</span>
            <van-icon name="play" size="0.48rem" />
        </li>

         <!-- 选择日期区间 -->
        <van-calendar
            v-model="showCalendar"
            type="range"
            :min-date="new Date('2018-01-01')"
            :max-date="new Date()"
            :default-date="[new Date(begintime), new Date(endtime)]"
            color="#07c160"
            @confirm="onConfirmCalendar"
            v-if="selectType === 'calendar'"
        />

        <van-popup
            v-else
            v-model="showCalendar"
            round
            position="bottom"
            :style="{ height: '50%', maxHeight: '70vh' }"
        >
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmDatetime"
                @cancel="showCalendar = false"
            />
        </van-popup>
    </ul>
</template>

<script>
import { getWeekRange, getMonthRange, fmtDate } from '@/utils/util'
import * as dayjs from 'dayjs'
export default {
  props: {
      begintime: {
          type: String,
          default: ''
      },
      endtime: {
          type: String,
          default: ''
      },
      selectType: {
          type: String,
          default: 'calendar' // datetimePicker, calendar
      }
  },
  data () {
    return {
      type: this.selectType === 'calendar' ? '' : 'month',
      showCalendar: false,
      currentDate: new Date(),
      minDate: new Date(2018, 1, 1),
      maxDate: new Date()
    }
  },
  computed: {
      timeText () {
          if (this.selectType === 'calendar') {
              return `${this.begintime} ~ ${this.endtime}`
          } else {
              return fmtDate(this.begintime, 'YYYY年MM月')
          }
      }
  },
  watch: {
      begintime: {
          handler (value) {
              if (this.selectType !== 'datetimePicker' || !value) return
              const date = new Date(value + '-01'.replace(/-/g, '/'))
              this.currentDate = date
          },
          immediate: true
      }
  },
  methods: {
      /**
       * key：天， 周， 月
       * day: 推迟天数
       */
    selectTime (key, num = 0) {
        if (this.selectType === 'calendar') {
             this.handlerCalendar(key, num)
        } else {
            this.handlerDatetime(key, num)
        }
    },
    // 确认选择日期
    onConfirmCalendar ([startDate, endDate]) {
        const startTime = fmtDate(startDate, 'YYYY/MM/DD')
        const endTime = fmtDate(endDate, 'YYYY/MM/DD')
        this.$emit('handleSetTime', [startTime, endTime])
        this.type = ''
        this.showCalendar = false
    },
    onConfirmDatetime (value) {
        const time = fmtDate(value, 'YYYY-MM')
        this.$emit('handleSetTime', time)
        this.showCalendar = false
    },
    handlerCalendar (key, num) {
        let date
        if (num === 0) {
            // 点击选择 今日 本周 本月
            this.type = key
            date = new Date()
        } else {
            // 点击选择 前一日/周/月 后一日/周/月
            date = new Date(this.endtime)
        }
        let timeList
        switch (key) {
            case 'week' :
                timeList = getWeekRange(date, num, 'YYYY/MM/DD')
                break
            case 'month' :
                timeList = getMonthRange(date, num, 'YYYY/MM/DD')
                break
            default :
                // eslint-disable-next-line no-case-declarations
                const time = dayjs(date).add(num, 'day').format('YYYY/MM/DD')
                timeList = [time, time]
                break
        }
        this.$emit('handleSetTime', timeList)
    },
    handlerDatetime (key, num) {
        const date = new Date((this.begintime + '-01').replace(/-/g, '/'))
        const time = dayjs(date).add(num, 'month').startOf('month').format('YYYY-MM')
        this.$emit('handleSetTime', time)
    }
  }
}
</script>

<style lang="scss" scoped>
.play-rotate {
  transform: rotate(180deg);
}
</style>
