<template>
    <div class="member-consume-record position-relative bg-gray overflow-hidden">
        <!-- 顶部操作 -->
        <div class="header bg-white shadow position-absolute padding-bottom-1">
            <!--
            <h3>消费记录</h3>
            <div class="">
                <i class="iconfont icon-shaixuan margin-right-3 text-size-lg" @click="slideMenuIsShow=true"></i>
                <i class="iconfont icon-sousuo text-size-lg" @click="searchFormIsShow=true"></i>
            </div>
            -->
            <div class="search-form d-flex justify-content-between align-items-center">
                <van-search
                    class="flex-1"
                    v-model="ordernum"
                    placeholder="请输入提现单号"
                />
                <van-button type="default" class="search-btn margin-left-2 text-success" @click="searchOrder">搜索</van-button>
            </div>
            <div class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2">
                <div
                    @click="showCalendar = !showCalendar"
                    class="d-flex align-items-center"
                >
                    <span>查询日期</span> <van-icon name="arrow-down" />
                </div>

                <div
                    @click="showCalendar = !showCalendar"
                >
                    {{searchTime.startTime}} ~ {{searchTime.endTime}}
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>
        <!-- 顶部操作 -->

        <!-- 选择日期区间 -->
        <van-calendar
            v-model="showCalendar"
            type="range"
            :min-date="new Date('2018-01-01')"
            :max-date="new Date()"
            :default-date="[new Date(searchTime.startTime), new Date(searchTime.endTime)]"
            color="#07c160"
            @confirm="onConfirmCalendar"
        />

        <main>
            <hd-scroll @pullingUpFn = "pullingUpFn" @getScroll="({ scroll }) => this.scroll = scroll">
                <div class="padding-y-3">
                    <!-- :to="`/income/record/${item.id}`" -->
                    <router-link
                        class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white"
                        v-for="item in list"
                        :key="item.id"
                        to=""
                        tag="div"
                    >
                        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                            <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                                <div class="">
                                    <div class=" text-000 text-size-default card-num">
                                        <span>金额：</span>
                                        <span class="font-weight-bold text-success" v-if="item.status === 1">&yen; {{item.money | fmtMoney}}</span>
                                        <span class="font-weight-bold text-danger" v-else >&yen; -{{item.money | fmtMoney}}</span>
                                    </div>
                                </div>
                                <van-tag v-if="item.status == 1" type="success">
                                    {{
                                        [1, 2, 3, 5, 6, 7].includes(item.paysource) ? '收入' :
                                        [4].includes(item.paysource) ? '提现' :
                                        [8].includes(item.paysource) ? '缴费收入' : '— —'
                                    }}
                                </van-tag>
                                <van-tag v-else-if="item.status == 2" type="danger">
                                    {{
                                        [1, 2, 3, 5, 7].includes(item.paysource) ? '退款' :
                                        [4].includes(item.paysource) ? '提现' :
                                        [6].includes(item.paysource) ? '收入' :
                                        [8].includes(item.paysource) ? (item.paytype === 1 ? '钱包缴费' : item.paytype === 2 ? '微信缴费' : '— —') :
                                        '未知收益'
                                    }}
                                </van-tag>
                            </div>
                        </div>
                        <hd-card class="padding-2 text-size-sm">
                            <hd-card-item class="">
                                <span class="card-item-title text-333">收益单号：</span>
                                <span class="card-item-content text-666">{{item.ordernum}}</span>
                            </hd-card-item>
                            <hd-card-item class="">
                                <span class="card-item-title text-333">账户余额：</span>
                                <span class="card-item-content text-666">
                                   {{ item.balance | fmtMoney  }}
                                </span>
                            </hd-card-item>
                            <hd-card-item class="" v-if="item.bankcardnum != 0">
                                <span class="card-item-title text-333">时间：</span>
                                <span class="card-item-content text-666">
                                    {{item.createTime}}
                                </span>
                            </hd-card-item>
                        </hd-card>
                    </router-link>
                    <hd-bottom :status="status" />
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import { fmtDate, dateRange } from '@/utils/util'
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import hdScroll from '@/components/hd-scroll'
import hdBottom from '@/components/hd-bottom'
import { inquireMerEarningsDetail } from '@/require/mine'
const LIMIT = 10
export default {
    data () {
        const range = dateRange(new Date(), 30, 'YYYY/MM/DD')
        return {
            uid: '',
            aid: '',
            scroll: null,
            currentPage: 1, // 当前页
            ordernum: '', // 输入的订单号
            showCalendar: false, // 是否显示选择日期
            searchTime: {
                startTime: range[0],
                endTime: range[1]
            },
            list: [],
            status: 1, // 0 正在加载中 1 空闲状态 2 暂无更多数据
            searchForm: {} // 搜索form
        }
    },
    mounted () {
        // 初始化数据
        this.uid = this.$route.params.id
        this.aid = this.$route.query.aid
        this.searchForm = {
            ...this.searchTime
        }
        this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid }, true)
    },
    components: {
        hdCard,
        hdCardItem,
        hdScroll,
        hdBottom
    },
    methods: {
        // 确认选择日期
        onConfirmCalendar ([startDate, endDate]) {
            const startTime = fmtDate(startDate, 'YYYY/MM/DD')
            const endTime = fmtDate(endDate, 'YYYY/MM/DD')
            this.searchTime = {
                startTime,
                endTime
            }
            this.showCalendar = false
            this.searchForm = {
                ...this.searchTime
            }
            this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid }, true)
        },
        async gatConsumeRecord (data, init = false) {
            if (init) {
               this.currentPage = 1
            } else {
                ++this.currentPage
            }
            try {
                this.status = 0
                const { code, message, ...result } = await inquireMerEarningsDetail({
                    ...data,
                    currentPage: this.currentPage,
                    limit: LIMIT
                })
                if (code === 200) {
                    // 判断是否是初始化，如果是初始化那么重新赋值，非初始化，再尾部追加值
                    if (init) {
                        this.list = result.recorddata
                    } else {
                        this.list = [...this.list, ...result.recorddata]
                    }
                    // 更改状态，看是否还有数据
                    if (result.recorddata.length >= LIMIT) {
                        this.status = 1
                    } else {
                        this.status = 2
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                console.log('e', e)
                this.$toast('异常错误')
            } finally {
                if (this.scroll) {
                    if (init) {
                        // 初始化加载的时候刷新滚动对象，并滚动到起始位置
                        this.scroll.refresh()
                        this.scroll.scrollTo(0, 0, 0, undefined, {})
                        this.scroll.finishPullUp()
                    } else {
                        // 非初始化加载完成的时候完成上啦加载操作
                        this.scroll.finishPullUp()
                    }
                }
            }
        },
        // 触发上啦加载
        pullingUpFn ({ scroll }) {
            // 当请求空闲的时候发送请求
            if (this.status === 1) {
                this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid })
            }
        },
        // 搜索订单号
        searchOrder () {
            this.searchForm = { ordernum: this.ordernum } // 搜索表单初始化
            this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid }, true)
        },
        // 筛选搜索
        filterSearch () {
            // 将搜索订单号条件置为空
            this.ordernum = undefined
            // 搜索条件中添加筛选类型和时间
            this.searchForm = {
                ...this.searchTime
            }
            // 发送请求
            this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid }, true)
            this.slideMenuIsShow = false
        },
        // 筛选重置
        filterReset () {
            this.selectWithdrawType = ''
            this.searchForm = {
                ...this.searchTime
            }
            // 发送请求
            this.gatConsumeRecord({ ...this.searchForm, uid: this.uid, aid: this.aid }, true)
            this.slideMenuIsShow = false
        }
    }
}
</script>

<style lang="scss">
.member-consume-record {
    height: 100vh;
    .header {
        width: 100%;
        z-index: 9999;
        .search-form {
            width: 100%;
            height: 45px;
            .van-search {
                padding: 0 0.32rem;
                .van-search__action {
                    color: #1989fa;
                }
            }
        }
        .search-btn {
            padding: 10px 0.2rem;
            height: auto;
            border: none;
            color: #1989fa;
            margin-left: -5px;
        }
    }
    .filter-box {
        padding-top: 84px;
        padding-bottom: 74px;
    }
    .filter-bottom {
        bottom: 0;
        left: 0;
        right: 0;
    }
    main {
        padding-top: 84px;
        height: 100vh;
        box-sizing: border-box;
        .record-card {
            .top {
                .top-title {
                    border-bottom: 1px dotted #ccc;
                }
            }
        }
    }
}
</style>
