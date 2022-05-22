<template>
    <div class="history-profit h-100 d-flex flex-column justify-content-between">
        <history-header
            :begintime="startTime"
            :endtime="endTime"
            @handleSetTime="handleSetTime"
        />
        <main class="flex-1 padding-top-3" v-no-data="!loading && resultlist.length <= 0">
            <div v-if="type === 1">
                <list-item :type="type" v-for="item in resultlist" :key="item.code" :data="item" />
            </div>
            <div v-else-if="type === 2">
                <list-item :type="type" v-for="item in resultlist" :key="item.name" :data="item" />
            </div>
            <time-statis v-else :resultTotal="resultTotal" :resultlist="resultlist" />
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
import { inquireEarningCollectInfo } from '@/require/history-profit'
export default {
    components: {
        HistoryHeader,
        HistoryFooter,
        TimeStatis,
        ListItem
    },
    data () {
        return {
            startTime: '',
            endTime: '',
            type: 3, // 1 设备统计 2 小区统计 3 时间统计
            resultTotal: null,
            resultlist: [],
            loading: false // 是否正在加载
        }
    },
    created () {
        this.handleSetTime(dateRange(new Date(), 15, 'YYYY/MM/DD'))
    },
    mounted () {
        this.getData()
    },
    methods: {
        // 设置时间
        handleSetTime ([startTime, endTime]) {
            this.startTime = startTime
            this.endTime = endTime
            this.getData()
        },
        // 设置类型
        selectType (type) {
            this.type = type
            this.getData()
        },
        async getData (data = {}, loadMsg) {
            try {
                /* ===== 每次请求之前先清空数据 ===== */
                this.resultlist = []
                this.resultTotal = null
                this.loading = true
                /* ===== 每次请求之前先清空数据 ===== */
                const { code, message, resultTotal, resultlist } = await inquireEarningCollectInfo({
                    ...data,
                    type: this.type,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    source: 2, // 默认值
                    tenantId: this.tenantId
                }, loadMsg)
                if (code === 200) {
                    this.resultTotal = resultTotal
                    this.resultlist = resultlist
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            } finally {
                this.loading = false
            }
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
