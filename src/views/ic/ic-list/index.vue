<template>
    <div class="ic-list position-relative d-flex flex-column">
        <div class="section shadow padding-bottom-2" :style="sectionTransZ">
            <div class="search-form d-flex padding-x-2 margin-top-2 align-items-center">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item v-model="type" :options="option1" @open="dropMenuStatus=1" @closed="dropMenuStatus=2" />
                </van-dropdown-menu>
                <van-search
                    v-model="keywords"
                    :placeholder="`请输入${option1[type-1].text}`"
                    class="search-input rounded-circle"
                />
                <van-button plain type="info" class="search-button" @click="handleSearch">搜索</van-button>
            </div>
            <div class="padding-top-2">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item v-model="value2" :options="option2"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                    <van-dropdown-item v-model="value3" :options="option3"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                    <van-dropdown-item v-model="value4" :options="option4"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                </van-dropdown-menu>
            </div>
            <div class="padding-top-2 padding-x-2 d-flex justify-content-around text-size-sm">
                <div><span>数量：</span><span class="text-success">{{datasize}}个</span></div>
                <div><span>充值：</span><span class="text-success">{{datatopupmoney}}元</span></div>
                <div><span>赠送：</span><span class="text-success">{{datasendmoney}}元</span></div>
            </div>
        </div>

        <main class="bg-gray">
            <hd-scroll
                @pullingUpFn = "pullingUpFn"
                @getScroll="getScroll"
            >
                <div class="padding-top-3">
                    <ic-list-card v-for="card in list" :key="card.id" :value="card"/>
                    <div
                        class="text-center padding-bottom-3 text-666"
                    >{{ status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import hdScroll from '@/components/hd-scroll'
import icListCard from '@/components/ic-list/ic-list-card'
import { inquireOnlineData } from '@/require/ic'
const REQUIRE_LENGTH = 35 // 请求返回值数量
export default {
    data () {
        return {
            keywords: '', // 搜索条件
            type: 1, // 搜索类型 和 option1 对应
            option1: [
                { text: 'IC卡号', value: 1 },
                { text: '手机号', value: 2 }
            ],
            value2: 0,
            option2: [
                { text: '所有小区', value: 0 },
                { text: '测试小区1', value: 1 },
                { text: '测试小区2', value: 2 },
                { text: '测试小区3', value: 3 }
            ],
            value3: 0,
            option3: [
                { text: '全部', value: 0 },
                { text: '正常', value: 1 },
                { text: '挂失', value: 2 },
                { text: '未绑定', value: 3 }
            ],
            value4: 0,
            option4: [
                { text: '默认排序', value: 0 },
                { text: '金额从大到小', value: 1 },
                { text: '金额从小到大', value: 2 }
            ],
            dropMenuStatus: 2, // 下拉菜单状态， 1 展开 2关闭
            status: 1, //  0 正在加载中 1 空闲状态 2 更多数据
            scroll: null, // 滚动实例
            list: [], // 列表数据
            currentPage: 1, // 当前页
            datasize: 0, // 在线卡数量
            datatopupmoney: 0, // 在线卡充值金额
            datasendmoney: 0 // 在线卡赠送金额
        }
    },
    mounted () {
        this.asyInquireOnlineData(true)
    },
    computed: {
        sectionTransZ () {
            const value = this.dropMenuStatus === 1 ? 'none' : 'translateZ(2px)'
            return {
                transform: value,
                webkitTransform: value
            }
        }
    },
    components: {
        hdScroll,
        icListCard
    },
    methods: {
        // 点击搜索按钮
        async handleSearch () {
            this.asyInquireOnlineData(true)
            if (this.scroll) {
                this.scroll.refresh()
                this.scroll.scrollTo(0, 0, 0, undefined, {})
            }
        },
        // 保存 scroll 实例
        getScroll ({ scroll, index }) {
            this.scroll = scroll
        },
        async pullingUpFn ({ scroll }) {
            if (this.status !== 2) {
                await this.asyInquireOnlineData()
                this.$nextTick(() => {
                    scroll.finishPullUp()
                })
            }
        },
        /* 异步请求card list */
        async asyInquireOnlineData (init = false) {
            if (!init) { // 非初始化状态
                if ([0, 2].includes(this.status)) return false // 正在加载中、无数据 取消请求
                this.currentPage++
            } else {
                this.currentPage = 1
            }
            this.status = 0
            const { datalist, datasize, datatopupmoney, datasendmoney } = await inquireOnlineData({
                type: this.type,
                keywords: this.keywords,
                areaId: '',
                currentPage: this.currentPage,
                limit: REQUIRE_LENGTH
            }, '正在加载数据')
            // 如果是初始化，需要将list置空之后再进行赋值
            if (init) {
                this.list = datalist
                this.datasize = datasize // 在线卡数量
                this.datatopupmoney = datatopupmoney // 在线卡充值金额
                this.datasendmoney = datasendmoney // 在线卡赠送金额
            } else {
                this.list = [...this.list, ...datalist]
            }
            if (datalist.length < REQUIRE_LENGTH) {
                this.status = 2 // 将状态置为无数据
            } else {
                this.status = 1 // 将状态置为空闲
            }
        }
    }
}
</script>

<style lang="scss">
.ic-list {
    height: 100vh;
    .section {
        position:  relative;
        transform: translateZ(2px);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 1rem 1rem 1rem rgba(255, 255, 0, 1);
        }
        .select-menu {
            .van-dropdown-menu__bar {
                height: 0;
                background-color: transparent;
                box-shadow: none;
                padding: 14px 14px 14px 0;
                .van-dropdown-menu__title {
                    font-size: 14px;
                }
            }
        }
        .search-form {
            .van-field__body {
                height: 100%;
                input {
                    height: 100%;
                }
            }
            .search-input {
                flex: 1;
                border-radius: 36px;
                padding-top: 0;
                padding-bottom: 0;
                &.van-cell {
                    padding: 3px 15px;
                }
            }
            .search-button {
                padding: 14px 10px;
                height: 0;
                border: none;
            }
        }
    }
    main {
        flex: 1;
        overflow-y: auto;
    }
}
</style>
