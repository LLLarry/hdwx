<template>
    <div class="device-list position-relative d-flex flex-column">
        <div class="section shadow padding-bottom-2">
            <van-tabs v-model="active" class="device-tab font-weight-bold">
                <van-tab :title="`在线 ${ source[0].total }`"></van-tab>
                <van-tab :title="`离线 ${ source[1].total }`"></van-tab>
                <van-tab :title="`全部 ${ source[2].total }`"></van-tab>
            </van-tabs>
            <div class="search-form d-flex padding-x-2 margin-top-2 align-items-center">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item v-model="type" :options="option1" @open="dropMenuStatus=1" @closed="dropMenuStatus=2" />
                </van-dropdown-menu>
                <van-search
                    v-model="parameter"
                    :placeholder="`请输入${option1[type].text}`"
                    class="search-input rounded-circle"
                />
                <!-- <van-field v-model="parameter" placeholder="请输入搜索条件" class="search-input bg-gray" /> -->
                <van-button plain type="info" class="search-button" @click="handleSearch">搜索</van-button>
            </div>
        </div>

        <main class="bg-gray">
            <van-tabs v-model="active" class="device-content" animated>
                <van-tab>
                    <hd-scroll
                        @pullingUpFn = "pullingUpFn"
                        @getScroll="getScroll"
                        :index="0"
                    >
                        <div class="padding-top-3">
                            <div v-no-data="source[0].list.length <= 0"></div>
                            <device-item v-for="item in source[0].list" :key="item.code" :value="item" class="margin-bottom-3"/>
                            <div
                                class="text-center padding-bottom-3 padding-top-3 text-666"
                                :class="{removePaddingTop: source[0].list.length !== 0}"
                                v-if="source[0].list.length > 0"
                            >{{ source[0].status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                             <div style="height: 30px;"></div>
                        </div>
                    </hd-scroll>
                </van-tab>
                <van-tab>
                    <hd-scroll
                        @pullingUpFn = "pullingUpFn"
                        @getScroll="getScroll"
                        :index="1"
                    >
                        <div class="padding-top-3">
                            <div v-no-data="source[1].list.length <= 0"></div>
                            <device-item v-for="item in source[1].list" :key="item.code" :value="item" class="margin-bottom-3"/>
                            <div
                                class="text-center padding-bottom-3 padding-top-3 text-666"
                                :class="{removePaddingTop: source[1].list.length !== 0}"
                                v-if="source[1].list.length > 0"
                            >{{ source[1].status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                            <div style="height: 30px;"></div>
                        </div>
                    </hd-scroll>
                </van-tab>
                <van-tab>
                    <hd-scroll
                        @pullingUpFn = "pullingUpFn"
                        @getScroll="getScroll"
                        :index="2"
                    >
                        <div class="padding-top-3">
                            <div v-no-data="source[2].list.length <= 0"></div>
                            <device-item v-for="item in source[2].list" :key="item.code" :value="item" class="margin-bottom-3"/>
                            <div
                                v-if="source[2].list.length > 0"
                                class="text-center padding-bottom-3 padding-top-3 text-666"
                                :class="{removePaddingTop: source[2].list.length !== 0}"
                            >{{ source[2].status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                             <div style="height: 30px;"></div>
                        </div>
                    </hd-scroll>
                </van-tab>
            </van-tabs>
        </main>
    </div>
</template>
<script>
import hdScroll from '@/components/hd-scroll'
import deviceItem from '@/components/device/device-item'
import { getDeviceInfoList } from '@/require/device'
export default {
    data () {
        return {
            active: 0,
            parameter: '', // 搜索条件
            type: 0, // 搜索类型 和 option1 对应
            option1: [
                { text: '设备编号', value: 0 },
                { text: '设备名称', value: 1 },
                { text: '小区名称', value: 2 }
            ],
            source: [
                {
                    list: [],
                    total: 0, // 总数量
                    status: 1, // 0 正在加载中 1 空闲状态 2 更多数据
                    currentPage: 1, // 当前页
                    scroll: null // 滚动实例
                },
                {
                    list: [],
                    total: 0, // 总数量
                    status: 1, //  0 正在加载中 1 空闲状态 2 更多数据
                    currentPage: 1, // 当前页
                    scroll: null // 滚动实例
                },
                {
                    list: [],
                    total: 0, // 总数量
                    status: 1, // 0 正在加载中 1 空闲状态 2 更多数据
                    currentPage: 1, // 当前页
                    scroll: null // 滚动实例
                }
            ],
            dropMenuStatus: 2 // 下拉菜单状态， 1 展开 2关闭
        }
    },
    mounted () {
        // this.$showLoading({
        //     title: 'wqwewq'
        // })
        // this.$showLoading({
        //     title: '123456'
        // })
        // this.$showLoading({
        //     title: '------'
        // })
        this.asyGetAjaxEquList(0, true)
        this.asyGetAjaxEquList(1, true)
        this.asyGetAjaxEquList(2, true)
        this.getDeviceNum()
    },
    components: {
        hdScroll,
        deviceItem
    },
    // computed: {
    //     sectionTransZ () {
    //         const value = this.dropMenuStatus === 1 ? 'none' : 'translateZ(2px)'
    //         return {
    //             transform: value,
    //             webkitTransform: value
    //         }
    //     }
    // },
    methods: {
        async pullingUpFn ({ scroll, index }) {
            if (this.source[index].status !== 2) {
                await this.asyGetAjaxEquList(index)
                this.$nextTick(() => {
                    scroll.finishPullUp()
                    // scroll.refresh()
                })
            }
        },
        /* 异步请求设备list */
        async asyGetAjaxEquList (index, init = false) {
            try {
                if (!init) { // 上拉加载
                    if ([0, 2].includes(this.source[index].status)) return false
                    this.source[index].currentPage++
                } else {
                    this.source[index].currentPage = 1
                }
                this.$set(this.source[index], 'status', 0)
                const { code, result, message } = await getDeviceInfoList({
                    // uid: 30,
                    equnum: 5,
                    currentPage: this.source[index].currentPage,
                    querynum: index + 1,
                    source: this.type + 1,
                    parameter: this.parameter
                }, '正在加载数据')
                if (code === 200) {
                    // 如果是初始化，需要将list置空之后再进行赋值
                    let list = []
                    if (init) {
                        list = result.devicelist
                    } else {
                        list = [...this.source[index].list, ...result.devicelist]
                    }
                    this.$set(this.source[index], 'list', list)
                    this.$set(this.source[index], 'equnum', this.source[index].list.length)
                    if (result.devicelist.length < 5) {
                        this.$set(this.source[index], 'status', 2) // 将状态置为无数据
                    } else {
                        this.$set(this.source[index], 'status', 1) // 将状态置为空闲
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
        async getDeviceNum () {
            try {
                const { code, message, result } = await getDeviceInfoList({
                    source: this.type + 1,
                    parameter: this.parameter
                }, '正在加载数据')
                if (code === 200) {
                    this.$set(this.source[0], 'total', result.onlineNum)
                    this.$set(this.source[1], 'total', result.offlineNum)
                    this.$set(this.source[2], 'total', result.totalNum)
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
        // 点击搜索按钮
        async handleSearch () {
            await Promise.all([
                this.asyGetAjaxEquList(0, true),
                this.asyGetAjaxEquList(1, true),
                this.asyGetAjaxEquList(2, true),
                this.getDeviceNum()
            ])
            if (this.source[0].scroll) {
                this.source[0].scroll.refresh()
                this.source[0].scroll.finishPullUp()
                this.source[0].scroll.scrollTo(0, 0, 0, undefined, {})
            }
            if (this.source[1].scroll) {
                this.source[1].scroll.refresh()
                this.source[1].scroll.finishPullUp()
                this.source[1].scroll.scrollTo(0, 0, 0, undefined, {})
            }
            if (this.source[2].scroll) {
                this.source[2].scroll.refresh()
                this.source[2].scroll.finishPullUp()
                this.source[2].scroll.scrollTo(0, 0, 0, undefined, {})
            }
        },
        // 保存 scroll 实例
        getScroll ({ scroll, index }) {
            this.source[index].scroll = scroll
        }
    }
}
</script>

<style lang="scss">
.device-list {
    height: 100vh;
    .section {
        position:  relative;
        // transform: translateZ(2px);
        z-index: 1;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 1rem 1rem 1rem rgba(255, 255, 0, 1);
        }
        .van-tabs__nav {
            background: transparent;
            .van-tab {
                font-size: 14px;
                &.van-tab--active  {
                    font-weight: bold;
                    color: #07c160;
                }
            }
            .van-tabs__line {
                background-color: #07c160;
            }
        }
        .search-form {
            .van-field__body {
                height: 100%;
                input {
                    height: 100%;
                }
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
        .device-content {
            height: 100%;
            .van-tabs__wrap {
                display: none;
            }
            .van-tabs__content {
                height: 100%;
                .van-tab__pane-wrapper {
                    height: 100%;
                    .van-tab__pane {
                        height: 100%;
                        // .device-item {
                        //     &:first-child {
                        //         margin-top: 15px;
                        //     }
                        // }
                    }
                }
                .removePaddingTop {
                    padding-top: 0 !important;
                    padding-bottom: 15px;
                }
            }
        }
    }
}
</style>
