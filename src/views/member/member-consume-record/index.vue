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
                    v-model="keywords"
                    placeholder="请输入订单编号"
                />
                <van-button type="default" class="search-btn margin-left-2 text-success" @click="searchOrder">搜索</van-button>
            </div>
            <div class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2">
                <div @click="showCalendar = !showCalendar" class="d-flex align-items-center"><span>查询日期</span> <van-icon name="arrow-down" /></div>
                <div @click="showCalendar = !showCalendar">{{searchTime.start}} ~ {{searchTime.end}}</div>
                <div class="text-success" @click="slideMenuIsShow=!slideMenuIsShow">筛选<i class="iconfont icon-shaixuan margin-left-1" ></i></div>
            </div>
        </div>
        <!-- 顶部操作 -->
        <!-- 侧边操作 -->
        <van-popup v-model="slideMenuIsShow" position="top" :style="{ width: '100%', maxHeight: '70%' }" >
            <div class="filter-box">
                <div>
                    <hd-title>
                    订单类型
                    </hd-title>

                    <hd-select-box class="padding-x-3">
                        <hd-select-box-item
                            v-for="item in orderType"
                            :key="item.text"
                            :value="item"
                            :selected="selectOrderType"
                            @onChange="handleOrderTypeChange"
                        >
                            {{item.text}}
                        </hd-select-box-item>
                    </hd-select-box>
                </div>
                <div v-show="payTypeIsShow">
                    <hd-title>
                    支付类型
                    </hd-title>

                    <hd-select-box class="padding-x-3">
                        <hd-select-box-item
                            v-for="item in payType"
                            :key="item.text"
                            :value="item"
                            :selected="selectPayType"
                            @onChange="handlePayTypeChange"
                        >
                            {{item.text}}
                        </hd-select-box-item>
                    </hd-select-box>
                </div>
            </div>
            <div class="filter-bottom position-absolute d-flex padding-3">
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
            :max-date="new Date"
            :default-date="[new Date(searchTime.start), new Date(searchTime.end)]"
            color="#07c160"
            @confirm="onConfirmCalendar"
        />

        <main>
            <hd-scroll @pullingUpFn = "pullingUpFn" @getScroll="({ scroll }) => this.scroll = scroll">
                <div class="padding-y-3">
                    <div
                        class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white"
                        v-for="item in list" :key="item.id"
                    >
                        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                            <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                                <div class="">
                                    <div class="font-weight-bold text-000 text-size-default card-num">00023656</div>
                                </div>
                                <van-tag v-if="item.status === 1" type="primary">充值订单</van-tag>
                                <van-tag v-else-if="item.status === 2" type="success">部分退费订单</van-tag>
                                <van-tag v-else-if="item.status === 3" type="danger">消费订单</van-tag>
                                <van-tag v-else-if="item.status === 4" type="warning">虚拟充值订单</van-tag>
                            </div>
                        </div>
                        <hd-card class="padding-2 text-size-sm">
                            <hd-card-item class="">
                                <span class="card-item-title text-333">订单号：</span>
                                <span class="card-item-content text-666">{{item.ordernum}}</span>
                            </hd-card-item>
                            <hd-card-item>
                                <span class="card-item-title text-333">
                                {{
                                    item.status === 1 ? '充值到账' :
                                    item.status === 2 ? '部分退费' :
                                    item.status === 3 ? '消费金额' :
                                    item.status === 4 ? '充值到账' : ''
                                }}：</span>
                                <span class="card-item-content text-666">{{item.handleMoney}}元</span>
                            </hd-card-item>
                            <hd-card-item>
                                <span class="card-item-title text-333">所属用户：</span>
                                <span class="card-item-content text-666">{{item.username}}</span>
                            </hd-card-item>
                            <hd-card-item>
                                <span class="card-item-title text-333">充值金额：</span>
                                <span class="card-item-content text-666">{{item.money}}元</span>
                            </hd-card-item>
                            <hd-card-item>
                                <span class="card-item-title text-333">赠送金额：</span>
                                <span class="card-item-content text-666">{{item.sendmoney}}元</span>
                            </hd-card-item>
                            <hd-card-item>
                                <span class="card-item-title text-333">创建时间：</span>
                                <span class="card-item-content text-666">{{item.createTime}}</span>
                            </hd-card-item>
                        </hd-card>
                    </div>
                    <hd-bottom :status="status" />
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import { fmtDate } from '@/utils/util'
import hdSelectBox from '@/components/hd-select-box'
import hdSelectBoxItem from '@/components/hd-select-box-item'
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import hdScroll from '@/components/hd-scroll'
import hdBottom from '@/components/hd-bottom'
import { icConsumeRecord } from '@/require/mock'
const MAX_LENGTH = 10
export default {
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png'),
            scroll: null,
            currentPage: 1,
            keywords: '',
            slideMenuIsShow: false, // 侧边菜单是否显示
            orderType: [
                { text: '全部', value: 1 },
                { text: '充值订单', value: 2 },
                { text: '消费订单', value: 3 }
            ],
            selectOrderType: 1,
            payType: [
                { text: '全部', value: 1 },
                { text: '微信支付', value: 2 },
                { text: '支付宝支付', value: 3 },
                { text: '虚拟充值', value: 4 }
            ],
            selectPayType: 1,
            showCalendar: false,
            searchTime: {
                start: fmtDate(new Date('2021-06-01'), 'YYYY/MM/DD'),
                end: fmtDate(new Date(), 'YYYY/MM/DD')
            },
            list: [],
            status: 1, // 0 正在加载中 1 空闲状态 2 暂无更多数据
            searchForm: {} // 搜索form
        }
    },
    mounted () {
        this.gatConsumeRecord({ }, true)
    },
    computed: {
        // 筛选支付方式是否显示
        payTypeIsShow () {
            return this.selectOrderType === 2
        }
    },
    components: {
        hdSelectBox,
        hdSelectBoxItem,
        hdCard,
        hdCardItem,
        hdScroll,
        hdBottom
    },
    methods: {
        handleOrderTypeChange ({ text, value }) {
            this.selectOrderType = value
        },
        handlePayTypeChange ({ text, value }) {
            this.selectPayType = value
        },
        // 确认选择日期
        onConfirmCalendar ([startDate, endDate]) {
            const start = fmtDate(startDate, 'YYYY/MM/DD')
            const end = fmtDate(endDate, 'YYYY/MM/DD')
            this.searchTime = {
                start,
                end
            }
            this.showCalendar = false
        },
        async gatConsumeRecord (data, init = false) {
            if (init) {
               this.currentPage = 1
            } else {
                ++this.currentPage
            }
            try {
                this.status = 0
                const { code, list, message } = await icConsumeRecord({
                    ...data,
                    currentPage: this.currentPage
                })
                if (code === 200) {
                    // 判断是否是初始化，如果是初始化那么重新赋值，非初始化，再尾部追加值
                    if (init) {
                        this.list = list
                    } else {
                        this.list = [...this.list, ...list]
                    }
                    // 更改状态，看是否还有数据
                    if (list.length >= MAX_LENGTH) {
                        this.status = 1
                    } else {
                        this.status = 2
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                console.log(e)
            } finally {
                if (init) {
                    // 初始化加载的时候刷新滚动对象，并滚动到起始位置
                    this.scroll && this.scroll.refresh()
                    this.scroll.scrollTo(0, 0, 0, undefined, {})
                } else {
                    // 非初始化加载完成的时候完成上啦加载操作
                    this.scroll && this.scroll.finishPullUp()
                }
            }
        },
        // 触发上啦加载
        pullingUpFn ({ scroll }) {
            // 当请求空闲的时候发送请求
            if (this.status === 1) {
                this.gatConsumeRecord(this.searchForm)
            }
        },
        // 搜索订单号
        searchOrder () {
            this.searchForm = { keywords: this.keywords } // 搜索表单初始化
            this.gatConsumeRecord(this.searchForm, true)
        },
        // 筛选搜索
        filterSearch () {
            // 将搜索订单号条件置为空
            this.keywords = ''
            // 搜索条件中添加筛选类型和时间
            this.searchForm = {
                selectOrderType: this.selectOrderType,
                selectPayType: this.selectOrderType !== 2 ? undefined : this.selectPayType,
                ...this.searchTime
            }
            // 发送请求
            this.gatConsumeRecord(this.searchForm, true)
            this.slideMenuIsShow = false
        },
        // 筛选重置
        filterReset () {
            this.selectOrderType = 1
            this.selectPayType = 1
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
