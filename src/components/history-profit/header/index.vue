<template>
    <div class="history-header padding-x-3 padding-y-3 shadow">
        <ul class="d-flex select-time">
            <li class="position-relative margin-x-2" :class="{'active': type === 'today'}" @click="handleSelectTime('today')">今日</li>
            <li class="position-relative margin-x-2" :class="{'active': type === 'week'}" @click="handleSelectTime('week')">本周</li>
            <li class="position-relative margin-x-2" :class="{'active': type === 'month'}" @click="handleSelectTime('month')">本月</li>
            <li class="position-relative margin-x-2 text-size-default text-hide">本月</li>
        </ul>

        <!-- <ul class="d-flex justify-content-between align-items-center time-contral margin-top-3">
            <li class="position-relative padding-x-1 d-flex align-items-center">
                <van-icon name="play" class="play-rotate" size="0.48rem" />
                <span class="margin-left-1" v-if="type==='week'" @click="selectTime('week', -1)">前一周</span>
                <span class="margin-left-1" v-else-if="type==='month'" @click="selectTime('month', -1)">前一月</span>
                <span class="margin-left-1" v-else @click="selectTime('today', -1)">前一天</span>
            </li>
            <li class="position-relative padding-x-1 d-flex align-items-center font-weight-bold" @click="showCalendar = true">
                {{begintime}} ~ {{endtime}}
            </li>
            <li class="position-relative padding-x-1 d-flex align-items-center">
                <span class="margin-right-1" v-if="type==='week'" @click="selectTime('week', 1)">后一周</span>
                <span class="margin-right-1" v-else-if="type==='month'" @click="selectTime('month', 1)">后一月</span>
                <span class="margin-right-1" v-else @click="selectTime('today', 1)">后一天</span>
                <van-icon name="play" size="0.48rem" />
            </li>
        </ul> -->

        <!-- 选择日期区间 -->
        <!-- <van-calendar
            v-model="showCalendar"
            type="range"
            :min-date="new Date('2018-01-01')"
            :max-date="new Date()"
            :default-date="[new Date(begintime), new Date(endtime)]"
            color="#07c160"
            @confirm="onConfirmCalendar"
        /> -->
        <hd-select-time
            :begintime="begintime"
            :endtime="endtime"
            ref="hdSelectTime"
            @handleSetTime="handleSetTime"
        />
    </div>
</template>

<script>
import HdSelectTime from '@/components/hd-select-time'
export default {
    props: {
        begintime: {
            type: String,
            default: ''
        },
        endtime: {
            type: String,
            default: ''
        }
    },
    components: {
        HdSelectTime
    },
    data () {
        return {
            type: ''
        }
    },
    methods: {
        handleSelectTime (type) {
            this.type = type
            this.$refs.hdSelectTime.selectTime(type)
        },
        handleSetTime (timeList) {
            this.$emit('handleSetTime', timeList)
        }
        /**
         * key：天， 周， 月
         * day: 推迟天数
         */
        // selectTime (key, num = 0) {
        //     let date
        //     if (num === 0) {
        //         // 点击选择 今日 本周 本月
        //         this.type = key
        //         date = new Date()
        //     } else {
        //         // 点击选择 前一日/周/月 后一日/周/月
        //         date = new Date(this.endtime)
        //     }
        //     let timeList
        //     switch (key) {
        //         case 'week' :
        //             timeList = getWeekRange(date, num, 'YYYY/MM/DD')
        //             break
        //         case 'month' :
        //             timeList = getMonthRange(date, num, 'YYYY/MM/DD')
        //             break
        //         default :
        //             // eslint-disable-next-line no-case-declarations
        //             const time = dayjs(date).add(num, 'day').format('YYYY/MM/DD')
        //             timeList = [time, time]
        //             break
        //     }
        //     this.$emit('handleSetTime', timeList)
        // },
        // // 确认选择日期
        // onConfirmCalendar ([startDate, endDate]) {
        //     const startTime = fmtDate(startDate, 'YYYY/MM/DD')
        //     const endTime = fmtDate(endDate, 'YYYY/MM/DD')
        //     this.$emit('handleSetTime', [startTime, endTime])
        //     this.type = ''
        //     this.showCalendar = false
        // }
    }
}
</script>

<style lang="scss">
.history-header {
    .select-time {
        li {
            border-bottom: 3px solid transparent;
            &.text-hide {
                color: transparent;
            }
            &.active {
                font-weight: bold;
                color: #000;
                font-size: 16px;
                border-bottom-color: #07c160;
            }
        }
    }
}
</style>
