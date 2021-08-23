<template>
    <div class="history-profit h-100 d-flex flex-column justify-content-between">
        <history-header
            :begintime="begintime"
            :endtime="endtime"
            @handleSetTime="handleSetTime"
        />
        <main class="flex-1 padding-top-3">
            <div v-if="type === 1">
                <list-item :type="type" />
            </div>
            <div v-else-if="type === 2">
                <list-item :type="type" v-for="item in 30" :key="item" />
            </div>
            <time-statis v-else />
        </main>
        <history-footer @selectType="selectType" />
    </div>
</template>

<script>
import HistoryHeader from '@/components/history-profit/header'
import HistoryFooter from '@/components/history-profit/footer'
import TimeStatis from '@/components/history-profit/time-statis'
import ListItem from '@/components/history-profit/list-item'
import { dateRange } from '@/utils/util'
export default {
    components: {
        HistoryHeader,
        HistoryFooter,
        TimeStatis,
        ListItem
    },
    data () {
        return {
            begintime: '',
            endtime: '',
            type: 1 // 1 设备统计 2 小区统计 3 时间统计
        }
    },
    created () {
        this.handleSetTime(dateRange(new Date(), 15, 'YYYY/MM/DD'))
    },
    methods: {
        // 设置时间
        handleSetTime ([begintime, endtime]) {
            this.begintime = begintime
            this.endtime = endtime
        },
        // 设置类型
        selectType (type) {
            this.type = type
        }
    }
}
</script>

<style lang="scss">
.history-profit {
    height: 100vh;
    main {
        background: #EFEEF3;
        overflow: auto;
    }
}
</style>
