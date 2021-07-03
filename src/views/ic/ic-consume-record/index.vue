<template>
    <div class="ic-consume-record position-relative bg-gray overflow-hidden">
        <!-- 顶部操作 -->
        <div class="header bg-white shadow position-absolute">
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
                    placeholder="请输入搜索关键词"
                />
                <van-button type="default" class="search-btn margin-left-2">搜索</van-button>
            </div>
            <div class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2">
                <div @click="showCalendar = !showCalendar">查询日期 <van-icon name="arrow-down" /></div>
                <div @click="showCalendar = !showCalendar">{{searchTime.start}} ~ {{searchTime.end}}</div>
                <div class="text-primary" @click="slideMenuIsShow=!slideMenuIsShow">筛选<i class="iconfont icon-shaixuan margin-left-1" ></i></div>
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
                <van-button type="default" class="flex-1">重置</van-button>
                <van-button type="info" class="flex-2 margin-left-2">确定</van-button>
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
            color="#1989fa"
            @confirm="onConfirmCalendar"
        />

        <main>
            <div class="padding-y-3">
                <div class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
                     <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                        <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                            <div class="">
                                <div class="font-weight-bold text-000 text-size-default card-num">A56EB912</div>
                            </div>
                            <van-tag type="primary">充值订单</van-tag>
                        </div>
                    </div>
                    <hd-card class="padding-2 text-size-sm">
                        <hd-card-item class="">
                            <span class="card-item-title text-333">订单号：</span>
                            <span class="card-item-content text-666">20210702165934790624037</span>
                        </hd-card-item>
                        <hd-card-item class="w-100">
                            <span class="card-item-title text-333">充值到账：</span>
                            <span class="card-item-content text-666">1.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">充值金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">赠送金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">创建时间：</span>
                            <span class="card-item-content text-666">2021-07-02 16:59:34</span>
                        </hd-card-item>
                    </hd-card>
                </div>

                <div class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
                     <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                        <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                            <div class="">
                                <div class="font-weight-bold text-000 text-size-default card-num">A56EB912</div>
                            </div>
                            <van-tag type="success">余额回收订单</van-tag>
                        </div>
                    </div>
                    <hd-card class="padding-2 text-size-sm">
                        <hd-card-item class="">
                            <span class="card-item-title text-333">订单号：</span>
                            <span class="card-item-content text-666">20210702165934790624037</span>
                        </hd-card-item>
                        <hd-card-item class="w-100">
                            <span class="card-item-title text-333">回收到账：</span>
                            <span class="card-item-content text-666">1.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">充值金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">赠送金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">创建时间：</span>
                            <span class="card-item-content text-666">2021-07-02 16:59:34</span>
                        </hd-card-item>
                    </hd-card>
                </div>

                <div class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
                     <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                        <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                            <div class="">
                                <div class="font-weight-bold text-000 text-size-default card-num">A56EB912</div>
                            </div>
                            <van-tag type="danger">消费订单</van-tag>
                        </div>
                    </div>
                    <hd-card class="padding-2 text-size-sm">
                        <hd-card-item class="">
                            <span class="card-item-title text-333">订单号：</span>
                            <span class="card-item-content text-666">20210702165934790624037</span>
                        </hd-card-item>
                        <hd-card-item class="w-100">
                            <span class="card-item-title text-333">消费金额：</span>
                            <span class="card-item-content text-666">1.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">充值金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">赠送金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">创建时间：</span>
                            <span class="card-item-content text-666">2021-07-02 16:59:34</span>
                        </hd-card-item>
                    </hd-card>
                </div>

                <div class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
                     <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                        <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                            <div class="">
                                <div class="font-weight-bold text-000 text-size-default card-num">A56EB912</div>
                            </div>
                            <van-tag type="warning">虚拟充值订单</van-tag>
                        </div>
                    </div>
                    <hd-card class="padding-2 text-size-sm">
                        <hd-card-item class="">
                            <span class="card-item-title text-333">订单号：</span>
                            <span class="card-item-content text-666">20210702165934790624037</span>
                        </hd-card-item>
                        <hd-card-item class="w-100">
                            <span class="card-item-title text-333">充值到账：</span>
                            <span class="card-item-content text-666">（充值）1.0元 -（赠送）0.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">充值金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">赠送金额：</span>
                            <span class="card-item-content text-666">9.0元</span>
                        </hd-card-item>
                        <hd-card-item>
                            <span class="card-item-title text-333">创建时间：</span>
                            <span class="card-item-content text-666">2021-07-02 16:59:34</span>
                        </hd-card-item>
                    </hd-card>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { fmtDate } from '@/utils/util'
import hdSelectBox from '@/components/hd-select-box'
import hdSelectBoxItem from '@/components/hd-select-box-item'
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
export default {
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png'),
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
            }
        }
    },
    mounted () {
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
        hdCardItem
    },
    methods: {
        onCancel () {
            console.log(this.keywords)
        },
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
        }
    }
}
</script>

<style lang="scss">
.ic-consume-record {
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
