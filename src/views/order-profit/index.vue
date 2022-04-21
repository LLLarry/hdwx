<template>
    <div class="order-profit position-relative bg-gray overflow-hidden">
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
                    placeholder="请输入订单编号"
                />
                <van-button type="default" class="search-btn margin-left-2 text-success" @click="searchOrder">搜索</van-button>
            </div>
            <div class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2">
                <div @click="showCalendar = !showCalendar" class="d-flex align-items-center"><span>查询日期</span> <van-icon name="arrow-down" /></div>
                <div @click="showCalendar = !showCalendar">{{searchTime.startTime}} ~ {{searchTime.endTime}}</div>
                <div class="text-success" @click="slideMenuIsShow=!slideMenuIsShow">筛选<i class="iconfont icon-shaixuan margin-left-1" ></i></div>
            </div>
        </div>
        <!-- 顶部操作 -->
        <!-- 侧边操作 -->
        <van-popup class="popup-box overflow-hidden" v-model="slideMenuIsShow" position="top" :style="{ width: '100%', maxHeight: '75%' }" >
            <div class="filter-box h-100 overflow-auto">
                 <div>
                    <hd-title>
                    设备号
                    </hd-title>

                    <div>
                        <van-search v-model="code" placeholder="请输入设备号" left-icon="" />
                    </div>
                </div>
                <div>
                    <hd-title>
                    订单类型
                    </hd-title>

                    <hd-select-box class="padding-x-3">
                        <hd-select-box-item
                            v-for="item in orderTypeList"
                            :key="item.text"
                            :value="item"
                            :selected="ordertype"
                            @onChange="handleOrderTypeChange"
                        >
                            {{item.text}}
                        </hd-select-box-item>
                    </hd-select-box>
                </div>
                <div>
                    <hd-title>
                    订单状态
                    </hd-title>

                    <hd-select-box class="padding-x-3">
                        <hd-select-box-item
                            v-for="item in statusList"
                            :key="item.text"
                            :value="item"
                            :selected="status"
                            @onChange="handleOrderStatusChange"
                        >
                            {{item.text}}
                        </hd-select-box-item>
                    </hd-select-box>
                </div>
                <div>
                    <hd-title>
                    支付类型
                    </hd-title>
                    <hd-select-box class="padding-x-3">
                        <hd-select-box-item
                            v-for="item in paytypeList"
                            :key="item.text"
                            :value="item"
                            :selected="paytype"
                            @onChange="handlePayTypeChange"
                        >
                            {{item.text}}
                        </hd-select-box-item>
                    </hd-select-box>
                </div>
            </div>
            <div class="filter-bottom d-flex padding-3">
                <van-button type="default" class="flex-1" @click="filterReset">重置</van-button>
                <van-button type="primary" class="flex-2 margin-left-2" @click="filterSearch">确定</van-button>
            </div>
        </van-popup>
        <!-- 侧边操作 -->

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
                    <router-link
                        class="record-card position-relative text-size-md text-666 overflow-hidden margin-bottom-3"
                        v-for="item in list" :key="item.id"
                        :to="`/order/detail/${item.id}`"
                        tag="div"
                    >
                        <div class="order-item d-flex padding-2 bg-gray">
                            <div class="left d-flex justify-content-center align-items-center">
                                <i class="iconfont icon-big-Pay" v-if="item.paytype === 3 || item.paytype === 5"></i>
                                <i class="iconfont icon-qianbao" v-else-if="item.paytype === 1 || item.paytype === 6"></i>
                                <i class="iconfont icon-weixin"  v-else-if="item.paytype === 2 || item.paytype === 2"></i>
                                <img class="yinlian" src="../../assets/images/yinlian.png" v-else-if="item.paytype === 12 || item.paytype === 13" />
                            </div>
                            <div class="center padding-x-1 margin-left-1">
                                <p class="margin-bottom-1">{{item.ordernum}}</p>
                                <p class="text-333 font-weight-bold margin-bottom-1">{{item.code}} <span v-if="item.addr">- {{item.addr}}</span></p>
                                <p class="text-p">{{item.createTtime}}</p>
                            </div>
                            <div class="right d-flex flex-column justify-content-between text-right">
                                <p class="">支付
                                    <span
                                        class="font-weight-bold"
                                        :class="[item.status === 1 ? 'text-success' : 'text-danger']"
                                    >&yen;{{item.money | fmtMoney}}</span></p>
                                <p
                                    class="text-999 text-right">
                                    {{ item.status === 1 ? '订单完成' : item.status === 2 ? '退款完成' : '' }}
                                </p>
                            </div>
                        </div>
                    </router-link>
                    <hd-bottom :status="loadStatus" />
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import { fmtDate, dateRange } from '@/utils/util'
import hdSelectBox from '@/components/hd-select-box'
import hdSelectBoxItem from '@/components/hd-select-box-item'
// import hdScroll from '@/components/hd-scroll'
import hdScroll from '@/components/hd-scroll/scroll'
import hdBottom from '@/components/hd-bottom'
import { inquireTraOrderData } from '@/require/order-profit'
const LIMIT = 10
export default {
    data () {
        const range = dateRange(new Date(), 5, 'YYYY/MM/DD')
        return {
            scroll: null,
            leaveScrollY: 0,
            currentPage: 1,
            ordernum: '',
            code: '', // 搜索设备号
            slideMenuIsShow: false, // 侧边菜单是否显示
            orderTypeList: [
                { text: '全部', value: '' },
                { text: '消费订单', value: 1 },
                { text: '充值订单', value: 2 }
            ],
            ordertype: '',
            statusList: [
                { text: '全部', value: '' },
                { text: '正常', value: 1 },
                { text: '退款', value: 2 }
            ],
            status: '',
            paytypeList: [
                { text: '全部', value: '' },
                { text: '钱包', value: 1 },
                { text: '微信', value: 2 },
                { text: '支付宝', value: 3 },
                { text: '银联', value: 4 }
            ],
            paytype: 1,
            showCalendar: false,
            searchTime: {
                startTime: range[0],
                endTime: range[1]
            },
            list: [],
            loadStatus: 1, // 0 正在加载中 1 空闲状态 2 暂无更多数据
            searchForm: {} // 搜索form
        }
    },
    mounted () {
        // 初始化数据
        this.searchForm = {
            ...this.searchTime
        }
        this.gatOrder(this.searchForm, true)
    },
    beforeRouteLeave (to, from, next) {
        if (this.scroll) {
            this.leaveScrollY = this.scroll.state.scrollTop
        }
        next()
    },
    watch: {
        $route: {
            handler () {
                if (this.scroll) {
                    this.scroll.scrollTo(this.leaveScrollY, 0)
                    this.scroll.refresh()
                }
            }
        }
    },
    components: {
        hdSelectBox,
        hdSelectBoxItem,
        hdScroll,
        hdBottom
    },
    methods: {
        handleOrderTypeChange ({ text, value }) {
            this.ordertype = value
        },
        handleOrderStatusChange ({ text, value }) {
            this.status = value
        },
        handlePayTypeChange ({ text, value }) {
            this.paytype = value
        },
        // 确认选择日期
        onConfirmCalendar ([startDate, endDate]) {
            const startTime = fmtDate(startDate, 'YYYY/MM/DD')
            const endTime = fmtDate(endDate, 'YYYY/MM/DD')
            this.showCalendar = false
            this.searchTime = {
                startTime,
                endTime
            }
            this.searchForm = {
                 ...this.searchForm,
                ...this.searchTime
            }
            this.gatOrder(this.searchForm, true)
        },
        async gatOrder (data, init = false) {
            if (init) {
               this.currentPage = 1
            } else {
                ++this.currentPage
            }
            try {
                this.loadStatus = 0
                const { code, resultlist, message } = await inquireTraOrderData({
                    ...data,
                    currentPage: this.currentPage,
                    limit: LIMIT
                })
                if (code === 200) {
                    // 判断是否是初始化，如果是初始化那么重新赋值，非初始化，再尾部追加值
                    if (init) {
                        this.list = resultlist
                    } else {
                        this.list = [...this.list, ...resultlist]
                    }
                    // 更改状态，看是否还有数据
                    if (resultlist.length >= LIMIT) {
                        this.loadStatus = 1
                    } else {
                        this.loadStatus = 2
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
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
            if (this.loadStatus === 1) {
                this.gatOrder(this.searchForm)
            }
        },
        // 搜索订单号
        searchOrder () {
            this.searchForm = { ordernum: this.ordernum } // 搜索表单初始化
            this.gatOrder(this.searchForm, true)
        },
        // 筛选搜索
        filterSearch () {
            // 搜索条件中添加筛选类型和时间
            this.searchForm = {
                ...this.searchTime,
                status: this.status,
                code: this.code,
                paytype: this.paytype,
                ordertype: this.ordertype
            }
            // 发送请求
            this.gatOrder(this.searchForm, true)
            this.slideMenuIsShow = false
        },
        // 筛选重置
        filterReset () {
            this.status = ''
            this.code = ''
            this.paytype = ''
            this.ordertype = ''
        }
    }
}
</script>

<style lang="scss">
.order-profit {
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
    .popup-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .filter-box {
            padding-top: 84px;
            flex: 1;
        }
        .filter-bottom {
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    main {
        padding-top: 84px;
        height: 100vh;
        box-sizing: border-box;
        background-color: #efeff4;
        .record-card {
            .order-item {
                .left {
                    width: 50px;
                    i {
                        font-size: 45px;
                        &.icon-weixin {
                            color: #22B14C;
                        }
                        &.icon-qianbao {
                            color: #E4BB3C;
                        }
                        &.icon-big-Pay {
                            color: #06B4FD;
                        }
                    }
                    .yinlian {
                        width: 45px;
                    }
                }
                .center {
                    width: calc(100% - 140px);
                }
                .right {
                     width: 90px;
                }
            }
        }
    }
}
</style>
